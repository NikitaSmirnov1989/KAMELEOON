const validUrl = (url: string) => {
    const domain = new URL(url);
    return domain.hostname.replace('www.','');
};
export default validUrl;