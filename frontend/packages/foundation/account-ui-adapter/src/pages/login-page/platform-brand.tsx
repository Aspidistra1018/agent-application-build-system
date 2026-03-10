import { useNavigate } from 'react-router-dom';
import { PlatformIcon } from './platform-icon';

export const PlatformBrand = () => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className="flex items-center gap-[10px] cursor-pointer select-none bg-transparent border-0 p-0"
      onClick={() => {
        navigate('/');
      }}
    >
      <div className="w-[34px] h-[34px] rounded-[10px] overflow-hidden shadow-[0_4px_10px_rgba(235,141,119,0.35)]">
        <PlatformIcon size={34} />
      </div>
      <span className="text-[24px] font-semibold leading-[24px] text-[#1D1C23]">
        Agent应用自动构建平台
      </span>
    </button>
  );
};
