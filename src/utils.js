// Функция проверки логина пользователя
export const getLogged = () => {
    return !!localStorage.getItem("logged");
}


// Функция которая исключает пропсы
export const excludeProp = (props, ...exludeArr) => {

    // Копируем объект
    let copyProps = Object.assign({}, props);

    // Проходим по аргументам(пропсы которые нужно убрать)
    exludeArr.map((exlude) => {

        // Удаляем пропс exclude
        delete copyProps[exlude];
    });
    return copyProps;
}