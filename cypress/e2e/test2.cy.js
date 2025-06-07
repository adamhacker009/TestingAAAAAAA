const loginForm = {
    username: () => cy.get('input[autocomplete="username"]'),
    password: () => cy.get('input[autocomplete="current-password"]'),
    submit: () => cy.get('#app > div.page > div > section > form > div.form__buttons > div:nth-child(3) > button').click()
}

const goToSearch = ({ url, routes, student }) => {
    cy.log('Переход на страницу авторизации')
    cy.visit(url + routes.login, { timeout: 10000 })

    cy.log('Ввод email')
    loginForm.username()
        .should('be.visible')
        .type(student.login)

    cy.log('Ввод пароля')
    loginForm.password()
        .should('be.visible')
        .type(student.password)

    cy.log('Нажатие на кнопку войти')
    loginForm.submit()
        .should('be.visible')

    cy.log('Проверка успешного входа')
    cy.url().should('include', 'https://dev.profteam.su/account/main')
}

describe ("Использование поисковика", ()=>{
    beforeEach(function () {
        cy.viewport(1920, 1080);
        cy.fixture('config').then(goToSearch)
    })

    it("Поиск без фильтров", ()=>{
        cy.log("Переход на страницу с потребностями")
        cy.get("#app > div.page > header:nth-child(1) > nav > a:nth-child(2)")
            .click({timeout: 1000})
        cy.log("Нажимаем на поиск, без фильтров")
        cy.get("#app > div.page > div > section > div > div.needs-block__needs-filters-wrapper > div.needs-block__filters-wrapper > div > div.filters-block__filter-list > div.search-input > div > button")
            .click({timeout: 1000})
    })

    it("Поиск c фильтром по диапазону", ()=>{
        cy.log("Переход на страницу с потребностями")
        cy.get("#app > div.page > header:nth-child(1) > nav > a:nth-child(2)")
            .click({timeout: 1000})
        cy.log("Нажимаем на поиск по диапазону")
        cy.get("#app > div.page > div > section > div > div.needs-block__needs-filters-wrapper > div.needs-block__filters-wrapper > div > div.filters-block__filter-list > div.salary-field > div.salary-field__wrapper.salary-field__wrapper--bottom > div > label:nth-child(1)")
            .click({timeout: 1000})
        cy.log("Вводим минимальную зарплату")
        cy.get("#app > div.page > div > section > div > div.needs-block__needs-filters-wrapper > div.needs-block__filters-wrapper > div > div.filters-block__filter-list > div.salary-field > div:nth-child(3) > div:nth-child(1) > div > input")
            .click({timeout: 1000}).type("1000")
        cy.log("Вводим максимальную зарплату")
        cy.get("#app > div.page > div > section > div > div.needs-block__needs-filters-wrapper > div.needs-block__filters-wrapper > div > div.filters-block__filter-list > div.salary-field > div:nth-child(3) > div:nth-child(2) > div > input")
            .click({timeout: 1000}).type("1000")
        cy.log("Нажимаем на поиск")
        cy.get("#app > div.page > div > section > div > div.needs-block__needs-filters-wrapper > div.needs-block__filters-wrapper > div > div.filters-block__filter-list > div.search-input > div > button")
            .click({timeout: 1000})
    })
    it("Поиск c фильтром по договорённости", ()=>{
        cy.log("Переход на страницу с потребностями")
        cy.get("#app > div.page > header:nth-child(1) > nav > a:nth-child(2)")
            .click({timeout: 1000})
        cy.log("Нажимаем на поиск по договорённости")
        cy.get("#app > div.page > div > section > div > div.needs-block__needs-filters-wrapper > div.needs-block__filters-wrapper > div > div.filters-block__filter-list > div.salary-field > div.salary-field__wrapper.salary-field__wrapper--bottom > div > label:nth-child(2)")
            .click({timeout: 1000})
        cy.log("Нажимаем на поиск")
        cy.get("#app > div.page > div > section > div > div.needs-block__needs-filters-wrapper > div.needs-block__filters-wrapper > div > div.filters-block__filter-list > div.search-input > div > button")
            .click({timeout: 1000})
    })
})
