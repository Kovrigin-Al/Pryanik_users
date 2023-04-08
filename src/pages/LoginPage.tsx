import InputField from "../components/InputField";
import { useAuth } from "../hooks/useAuth";
import useInput from "../hooks/useInput";
import { useRequest } from "../hooks/useRequest";

interface ILoginResponse {
    data: {
        token: string;
    } | null;
    error_code: number;
    error_message: string;
}
const LoginPage = () => {
    const username = useInput("");
    const password = useInput("");

    const { request, isLoading, cleanError, error, setError } = useRequest();
    const { login } = useAuth();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        cleanError();
        request("/ru/data/v3/testmethods/docs/login", "POST", {
            username: username.value,
            password: password.value,
        })
            .then((response: ILoginResponse) => {
                if (response.data) {
                    login(response.data.token);
                } else {
                    throw new Error("Unexpected Error in server reply");
                }
            })
            .catch((error) => {
                setError((prev) => prev || `${error}`);
            });
    };
    return (
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                    Log in to your account
                </h2>
                <form onSubmit={handleSubmit}>
                    <InputField conrolProps={username} name="username" type="text" />
                    <InputField conrolProps={password} name="password" type="password" />
                    <div className="relative pt-5">
                        {error && (
                            <p className="text-sm absolute top-0 text-red-800">{error}</p>
                        )}
                        <button
                            disabled={isLoading}
                            type="submit"
                            className={
                                isLoading
                                    ? "pointer-events-none relative flex w-full justify-center  rounded-md border border-transparent bg-gray-400 py-2 text-sm font-medium text-white"
                                    : "relative flex w-full justify-center  rounded-md border border-transparent bg-sky-600 py-2 text-sm font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                            }
                        >
                            Log in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default LoginPage;
