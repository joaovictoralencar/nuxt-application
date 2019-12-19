
import axios from 'axios'
export const state = () => ({
    authUser: null//guarda no store do vuex o usuário autenticado
})
export const getters = {}
export const mutations = {
    //função que permite que o a variável do store seja alterada
    SET_USER(state, user) {
        state.authUser = user
    }
}
//a cada página, antes de renderizar ela, será necessário checar se existe um usuário autenticado conectado e então definir ele para a página
export const actions = {
    nuxtServerInit({ commit }, { req }) {
        if (req && req.session && req.session.authUser) {
            commit('SET_USER', req.session.authUser)
        }
    },
    //ação de login
    async login({ commit }, { username, password }) {
        try {
            //faz isso de maneira assíncrona
            const { data } = await axios.post('/api/login', { username, password })//utiliza o axios para postar o login. Está definido em index.js
            commit('SET_USER', data)//define a variável do store para o usuário logado
        } catch (error) { //caso o login não dê certo
            if (error.response && error.response.status === 401) {//se for o erro 401
                throw new Error('Bad credentials')
            }
            throw error
        }
    },
    //ação del logout
    async logout({ commit }) {
        //faz isso de maneira assíncrona
        await axios.post('/api/logout')//utiliza o axios para postar o logout. Está definido em index.js
        commit('SET_USER', null)//define a variável do store para nulo
    }

}