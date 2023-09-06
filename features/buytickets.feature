Feature: ticket booking
    Scenario: successful booking of one ticket
        Given user is on "http://qamid.tmweb.ru/client/index.php" page
        When user selects "1" next date
        When user selects the session time 
        When user selects one free spot
        When user clicks on the reservation button 
        Then text "Получить код бронирования" appears on the reservation button

    Scenario: successful booking of several tickets
        Given user is on "http://qamid.tmweb.ru/client/index.php" page
        When user selects "1" next date
        When user selects the session time
        When user selects one free spot
        When user selects one free spot
        When user selects one free spot
        When user clicks on the reservation button 
        Then text "Получить код бронирования" appears on the reservation button

    Scenario: not successful booking of not free tickets
        Given user is on "http://qamid.tmweb.ru/client/index.php" page
        When user selects "1" next date
        When user selects the session time
        When user selects one not free spot
        When user clicks on the reservation button 
        Then text "Забронировать" appears on the reservation button    