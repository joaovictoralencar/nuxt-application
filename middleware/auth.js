export default function ({ store, error }) {
    if (store.state.authUser) {//se não existir no store algum usuário autenticado, lança o erro
        console.log(error)
        return error({
            message: 'You are not connected',
            statusCode: 403
        })
    }
}
