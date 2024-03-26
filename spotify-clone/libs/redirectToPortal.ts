export const redirectToPortal = async (url: string) => {
    if (typeof window !== 'undefined') {
        window.location.assign(url);
    }
};