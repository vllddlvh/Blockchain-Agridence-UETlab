import './MetaMaskModal.css';

export default function MetaMaskModal({ isOpen, onClose, onSign }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="metamask-modal">
        <div className="modal-header">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" 
            alt="MetaMask" 
            width="32" 
            height="32"
          />
          <h3>Ký Giao Dịch (MetaMask)</h3>
        </div>
        
        <div className="modal-body">
          <p className="warning-text">Bạn đang yêu cầu ký một giao dịch để đẩy Hash lên Blockchain.</p>
          
          <div className="tx-details">
            <div className="detail-row">
              <span>Smart Contract:</span>
              <code>0xBatchRegistry...</code>
            </div>
            <div className="detail-row">
              <span>Hành động:</span>
              <strong>MintBatch()</strong>
            </div>
            <div className="detail-row">
              <span>Phí Gas dự kiến:</span>
              <span>0.0015 ETH</span>
            </div>
            <div className="detail-row hash-data">
              <span>Data Hash (SHA-256):</span>
              <code>e3b0c44298fc1c149afbf4c8996fb9242...</code>
            </div>
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}>Từ chối</button>
          <button className="btn-confirm" onClick={onSign}>Ký (Sign)</button>
        </div>
      </div>
    </div>
  );
}
