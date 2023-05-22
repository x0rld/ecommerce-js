
export const Header = () => {
    function modalHandler(e:any) {
        const dialog = document.querySelector(e.target.dataset.target) as HTMLDialogElement
        dialog.showModal()
    }

    return (
        <>
        <header className="mx-2">
            <div className="flex justify-center font-medium text-5xl">Kitty selling</div>
            <nav>
                <div className="flex justify-center my-3">
                    <button className="h-12 w-1/3 bg-red-700 rounded-s-md text-xl text-white"
                            data-target="#show-basket" onClick={modalHandler}
                            id="show-modal"><i className="bi-cart"></i> panier
                    </button>
                    <button className="h-12 w-1/3 bg-sky-500 text-xl text-white bi-filter">femelle</button>
                    <button className="h-12 w-1/3 bg-lime-600 rounded-e-md text-xl text-white bi-filter">mâle</button>
                </div>
            </nav>
        </header>
        </>
    )
};