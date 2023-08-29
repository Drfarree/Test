import SwapComponent from "../../components/SwapComponent/SwapComponent";


function SwapPage(props) {
    return (
        <div class="flex md:flex-row flex-col ">
            <div class="flex md:w-8/12 bg-sky-500/75 justify-center">
                Gráfico de ETH
            </div>
            <div class="flex md:w-4/12 justify-center">
                <SwapComponent />
            </div>
        </div>
    );
}

export default SwapPage;