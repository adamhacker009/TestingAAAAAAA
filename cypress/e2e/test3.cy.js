const loginForm = {
    username: () => cy.get('input[autocomplete="username"]'),
    password: () => cy.get('input[autocomplete="current-password"]'),
    submit: () => cy.get('#app > div.page > div > section > form > div.form__buttons > div:nth-child(3) > button').click()
}

const goToApply = ({ url, routes, student }) => {
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

describe("Принятие студентом потребности", ()=>{
    beforeEach(function () {
        cy.viewport(1920, 1080);
        cy.fixture('config').then(goToApply)
    })
    it("Принятие", ()=>{
        cy.log("Переход на страницу с потребностями")
        cy.get("#app > div.page > header:nth-child(1) > nav > a:nth-child(2)")
            .click({timeout: 1000})
        cy.log("Нажатие на кнопку отклик")
        cy.contains('Откликнуться')
            .first()
            .scrollIntoView()
            .should('be.visible').click();
    })
})

describe("Отрицательные сценарии", ()=>{
    beforeEach(function () {
        cy.viewport(1920, 1080);
        cy.fixture('config').then(goToApply)
    })
    it("Попытка нажать на уже откликнутую потребность", ()=>{
        cy.log("Переход на страницу с потребностями")
        cy.get("#app > div.page > header:nth-child(1) > nav > a:nth-child(2)")
            .click({timeout: 1000})
        cy.log("Попытка нажатия на кнопку отклик")
        cy.contains('Вы уже откликнулись!')
            .first()
            .scrollIntoView()
            .should('be.visible');
    })
})