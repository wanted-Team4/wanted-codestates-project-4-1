import { TailSpin } from "react-loader-spinner";
import styled from "styled-components";

const SpinContainer = styled.div`
    position: absolute;
    top:25em;
`;

const Loading = () => {
    return (
        <SpinContainer>
            <TailSpin
                color="#457CC7"
                height={70}
                width={70}
            />
        </SpinContainer>
    );
}

export default Loading;