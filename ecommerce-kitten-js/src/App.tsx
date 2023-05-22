import {Header} from "./Header.tsx";
import {Container} from "./Container.tsx";
import {BasketModal} from "./BasketModal.tsx";

function App() {
  //  const modalRef = useRef<HTMLDialogElement>() ;
    return (
        <>
            <Header />
            <Container/>
            <BasketModal />
        </>
    )
}
export default App
