const DeleteButton = ({ handleDeleting, id }) => {
    return (
        <button onClick={() => handleDeleting(id)}>
            delete
        </button>
    )
}

export default DeleteButton