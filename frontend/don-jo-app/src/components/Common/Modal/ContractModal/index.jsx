import * as S from "./style";
import { Mobile } from "../../components/Common/Template";
import BasicModal from "../BasicModal";
import FullScreenModal from "../FullScreenModal";
import PropTypes from "prop-types";

const DesktopTablet = ({ children }) => {
  const isDesktopTablet = useMediaQuery({ minWidth: 769 });
  return isDesktopTablet ? children : null;
};

const ContractInfo = () => {
  return <S.Container></S.Container>;
};

const ContractModal = ({ handleSetShowModal }) => {
  return (
    <>
      <DesktopTablet>
        <BasicModal handleSetShowModal={handleSetShowModal} width={37.875}>
          <ContractInfo />
        </BasicModal>
      </DesktopTablet>

      <Mobile>
        <FullScreenModal handleSetShowModal={handleSetShowModal}>
          <ContractInfo />
        </FullScreenModal>
      </Mobile>
    </>
  );
};

export default ContractModal;

ContractModal.propTypes = {
  handleSetShowModal: PropTypes.func.isRequired,
};
