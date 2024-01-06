import validUrl from "./validUrl";
function requets(data: any, setData: any): void{
    const request1 = fetch("http://localhost:8000/tests").then(resp => resp.json());
    const request2 = fetch("http://localhost:8000/sites").then(resp => resp.json());
    setData((prewData: any) => {
      return {
        ...prewData,
        loading: true,
      }
    });
    Promise.all([request1, request2])
      .then(([tests, sites]) => {
        const newData = tests.map((v: any) => {
          const {siteId} = v;
          const i = sites.findIndex((v: any) => {
            return v.id === siteId;
          });
          return {
            ...v,
            site: validUrl(sites[i].url),
          }
        });
        setData((prewData: any) => {
          return {
            ...prewData,
            tests: newData,
            loading: false,
          }
        });
      })
      .catch(err => {
        setData((prewData: any) => {
          return {
            ...prewData,
            loading: false,
            error: "Error",
          }
        });
      })
}
export default requets;