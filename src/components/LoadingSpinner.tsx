type Props = {};
const LoadingSpinner = (props: Props) => {
    return (
        <div className="flex justify-center my-3">
            <div className="w-16 h-16 border-4 border-sky-800 border-dashed rounded-full animate-spin"></div>
        </div>
    );
};
export default LoadingSpinner;
