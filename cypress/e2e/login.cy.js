describe('Проверка авторизации', function () {

    it('Позитивный кейс авторизации: верный логин и верный пароль', function () {
         cy.visit('/');//Зашли на сайт
         cy.get('#mail').type('german@dolnikov.ru');//Ввести правильный логин
         cy.get('#pass').type('iLoveqastudio1');// Ввести правильный пароль
         cy.get('#loginButton').click();//Нажать войти
         cy.get('#messageHeader').should('be.visible');//найденный элемент содержит текст
         cy.get('#messageHeader').contains('Авторизация прошла успешно');//текст авторизации действительно отображен на странице
         cy.get('#exitMessageButton > .exitIcon').should('be.visible');//наличие кнопки крестик
     })

     it('Проверка логики восстановления пароля', function () {
        cy.visit('/');//Зашли на сайт
        cy.get('#forgotEmailButton').click();//Нажать «Забыли пароль»
        cy.get('#mailForgot').type('zabaev7777@yandex.ru');//Ввести любой имейл
        cy.get('#restoreEmailButton').click();//Нажать отправить код
        cy.get('#messageHeader').should('be.visible');//найденный элемент содержит текст
        cy.get('#messageHeader').contains('Успешно отправили пароль на e-mail');//текст авторизации действительно отображен на странице
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');//наличие кнопки крестик
    })

    it('Негативный кейс авторизации: Верный логин и неверный пароль', function () {
        cy.visit('/');//Зашли на сайт
        cy.get('#mail').type('german@dolnikov.ru');//Ввести правильный логин
        cy.get('#pass').type('Hyuflkjijjoiojj66778900123b_tQQQQ');//Ввести неправильный пароль
        cy.get('#loginButton').click();//Нажать войти
        cy.get('#messageHeader').should('be.visible');//найденный элемент содержит текст
        cy.get('#messageHeader').contains('Такого логина или пароля нет');//текст действительно отображен на странице
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');//наличие кнопки крестик
    })

    it('Негативный кейс авторизации: Неверный логин и верный пароль', function () {
        cy.visit('/');//Зашли на сайт
        cy.get('#mail').type('zurten@dolnikov.ru');//Ввести неправильный логин
        cy.get('#pass').type('iLoveqastudio1');//Ввести правильный пароль
        cy.get('#loginButton').click();//Нажать войти
        cy.get('#messageHeader').should('be.visible');//найденный элемент содержит текст
        cy.get('#messageHeader').contains('Такого логина или пароля нет');//текст действительно отображен на странице
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');//наличие кнопки крестик
    })

    it('Негативный кейс валидации: Ввести логин без @', function () {
        cy.visit('/');//Зашли на сайт
        cy.get('#mail').type('germandolnikov.ru');//Ввести логин без @
        cy.get('#pass').type('iLoveqastudio1');//Ввести правильный пароль
        cy.get('#loginButton').click();//Нажать войти
        cy.get('#messageHeader').should('be.visible');//найденный элемент содержит текст
        cy.get('#messageHeader').contains('Нужно исправить проблему валидации');//текст действительно отображен на странице
     })

     it('Авторизация на приведение к строчным буквам в логине', function () {
        cy.visit('/');//Зашли на сайт
        cy.get('#mail').type('GerMan@Dolnikov.ru');//Ввели строчные буквы в логине
        cy.get('#pass').type('iLoveqastudio1');// Ввести правильный пароль
        cy.get('#loginButton').click();//Нажать войти
        cy.get('#messageHeader').should('be.visible');//найденный элемент содержит текст
        cy.get('#messageHeader').contains('Авторизация прошла успешно');//текст авторизации действительно отображен на странице
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');//наличие кнопки крестик
       //Ожидаемый результат:Тест упал, так как разработчик не реализовал возможность приведения логинов к нижнему регистру.
       //Таким образом, этот тест выявит баг, связанный с неправильной обработкой регистра символов в логинах.
    })

    describe('Проверка покупки нового аватара', function () {                 // название набора тестов
        it('e2e тест на покупку нового аватара для тренера', function () {   // название теста
             cy.visit('https://pokemonbattle.ru/');                          // переходим на сайт https://pokemonbattle.ru/
             cy.get('input[id="k_email"]').type('USER_LOGIN');                   // вводим логин
             cy.get('input[id="k_password"]').type('USER_PASSWORD');               // вводим пароль
             cy.get('button[type="submit"]').click();                // нажимаем кнопку Подтвердить
             cy.wait(2000);
             cy.get('.header_card_trainer').click();            // Клик в шапке на аву тренера
             cy.wait(2000);
             cy.get('.k_mobile > :nth-child(5) > #dropdown > img').click(); // нажимаем кнопку Смена аватара
             cy.get('.available > button').first().click();   // кликаем Купить у первого доступного аватара
             cy.get('.card_number').type('4620869113632996');                     // вводим номер карты
             cy.get('.card_csv').type('125');                             // вводим CVV карты
             cy.get('.card_date').type('1226');                           // вводим срок действия карты
             cy.get('.card_name').type('NAME');                           // вводим имя владельца действия карты
             cy.get('.style_1_base_button_payment_body > .style_1_base_button_payment').click();     // нажимаем кнопку Оплатить
             cy.get('.threeds_number').type('56456');                            // вводим код подтверждения СМС
             cy.get('.style_1_base_button_payment_body > .style_1_base_button_payment').click();   // нажимаем кнопку Оплатить
             cy.contains('Покупка прошла успешно').should('be.visible');     // проверяем наличие и видимость сообщения об успешной покупке
         });
     });
    
    })




