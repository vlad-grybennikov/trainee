export const getLogged = () => {
    return !!localStorage.getItem("logged");
}
export const excludeProp = (props, ...exludeArr) => {
    let copyProps = Object.assign({}, props);
    exludeArr.map((exlude) => {
        delete copyProps[exlude];
    });
    return copyProps;
}