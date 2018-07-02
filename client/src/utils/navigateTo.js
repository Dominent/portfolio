const navigateTo = (id) => {
    let element = document.getElementById(id);
    
    if(element) {
        element.scrollIntoView();
    }
}

export default navigateTo;