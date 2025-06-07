const loginForm = {
    username: () => cy.get('input[autocomplete="username"]'),
    password: () => cy.get('input[autocomplete="current-password"]'),
    submit: () => cy.get('#app > div.page > div > section > form > div.form__buttons > div:nth-child(3) > button').click()
}

const goToNeeds = ({ url, routes, employer }) => {
    cy.log('Переход на страницу авторизации')
    cy.visit(url + routes.login, { timeout: 10000 })

    cy.log('Ввод email')
    loginForm.username()
        .should('be.visible')
        .type(employer.login)

    cy.log('Ввод пароля')
    loginForm.password()
        .should('be.visible')
        .type(employer.password)

    cy.log('Нажатие на кнопку войти')
    loginForm.submit()
        .should('be.visible')

    cy.log('Проверка успешного входа')
    cy.url().should('include', 'https://dev.profteam.su/account/main')
}

describe("Положительные сценарии", ()=>{
    beforeEach(function () {
        cy.viewport(1920, 1080);
        cy.fixture('config').then(goToNeeds)
        cy.log("Нажать на кнопку для перехода на отклики")
        cy.get("#app > div.page > div > div.page-navigation > div.page-nav > div:nth-child(5) > p")
            .click({timeout: 1000});
        cy.log("Нажать на кнопку для сортировки откликов, на рассмотрении")
        cy.get("#app > div.page > div > div.page-navigation > div.page-nav__mobile > section.responses-page > div.responses-page__menu > nav > div > div:nth-child(2) > span.navigation-item__title")
            .click({timeout: 1000});
    });

    it("Принятие заявки", ()=>{
        cy.log("Нажать на кнопку, принятие заявки")
        cy.get('#app > div.page > div > div.page-navigation > div.page-nav__mobile > section.responses-page > div.responses-list.responses-page__nav > div > article:nth-child(1) > div.responses-list-item__actions > div:nth-child(1)')
            .click({timeout: 1000});
    })
    it("Отказ заявки", ()=>{
        cy.log("Нажать на кнопку, отказа заявки")
        cy.get("#app > div.page > div > div.page-navigation > div.page-nav__mobile > section.responses-page > div.responses-list.responses-page__nav > div > article:nth-child(1) > div.responses-list-item__actions > div:nth-child(2)")
            .click({timeout: 1000});
    })
})

describe("Отрицательные сценарии", ()=>{
    beforeEach(function () {
        cy.viewport(1920, 1080);
        cy.fixture('config').then(goToNeeds)
        cy.log("Нажать на кнопку для перехода на отклики")
        cy.get("#app > div.page > div > div.page-navigation > div.page-nav > div:nth-child(5) > p")
            .click({timeout: 1000});
    });
    it("Попытка принятие отклонённой заявки", ()=>{
        cy.log("Попытка нажать на кнопку, отклонённой заявки")
        cy.contains('Отклик отклонён')
            .first()
            .scrollIntoView()
            .should('be.visible').click();
    })

})