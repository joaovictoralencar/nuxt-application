export default function ({ store, route, redirect }) {
    if (!store.state.authUser) {//se não existir no store algum usuário autenticado, lança o erro
        return redirect('/login')
    }
}
