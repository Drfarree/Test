import { FloatButton, Modal } from 'antd';
import { SwapOutlined } from '@ant-design/icons';
import SwapComponent from '../SwapComponent/SwapComponent';
import { useState } from "react";

const SwapButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <FloatButton icon={<SwapOutlined />} type="primary" tooltip={<div>Swap tokens</div>} onClick={showModal} />
            <Modal open={isModalOpen} onCancel={handleCancel} onOk={handleOk} footer={null} closeIcon={null}>
                <SwapComponent />
            </Modal>
        </>
    )

}

export default SwapButton;