import React, { useState } from "react";
import { BasicModal } from "../../components/Common/Modal/BasicModal";

const Personal = () => {
  // Test Code Start
  const [isShowModal, setIsShowModal] = useState(false);

  const hey = <div>호롤롤로</div>;
  //Test Code End

  return (
    <div>
      Personal Page
      {/* Test Code Start*/}
      <div>
        <button onClick={() => setIsShowModal(true)}>베이직 모달 버튼</button>
      </div>
      {isShowModal && (
        <BasicModal handleSetShowModal={setIsShowModal} children={hey} />
      )}
      {/* Test Code End */}
    </div>
  );
};

export default Personal;
