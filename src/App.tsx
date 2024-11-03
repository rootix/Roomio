import Rooms from './Rooms';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="container xl:w-1/2 mx-auto p-4 text-gray-700 dark:text-gray-50">
                <Rooms />
            </div>
        </QueryClientProvider>
    );
}

const metaThemeColor = document.querySelector('#meta-theme-color');

function setThemeColor(isDarkMode: boolean) {
    metaThemeColor?.setAttribute('content', isDarkMode ? '#000000' : '#ffffff');
}

setThemeColor(window.matchMedia('(prefers-color-scheme: dark)').matches);

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    setThemeColor(event.matches);
});

export default App;
