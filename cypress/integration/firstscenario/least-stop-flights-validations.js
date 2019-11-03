describe('Scenario: least stop flights page validations', function () {

	before(function () {
//this will get the flight data from fixture file flightdetails.json
        cy.log('Fetching data from Fixture file')
		cy.fixture('flightdetails').as('flightdata')
//get the URL from command line and launch web application by calling custom
//command
		cy.navigateAndChangeLanguage(Cypress.env('api_server'))
	})

	it('search flights with random input data on flights home page', function () {
//below method calls the custom command to fill random details from fixture and
//search flights
		cy.fillAndSearchFlights(this.flightdata)
	})

	it('filter and select flight from listing page ', function () {
// select the least stop/no stop flight
        cy.log('Selecting the filter for least stop flight')
		cy.get('.form-check-input').first().click({force: true}).should('be.checked') 
		cy.wait(1000)  
		cy.log('Selecting a flight')
		cy.get('button[data-testid=FlightSearchResult__Itinerary1__SelectFlightButton]').click({force: true})
		cy.wait(1000)  
	})

	it('perform validations on traveller details page', function () {
		cy.wait(30000)  
		cy.log('Entering valid data for contact details')
		cy.get('input[data-testid=FlightPAX__ContactDetails__FirstNameInput]').should('be.visible').type('John',({force: true})).should('have.value', 'John')
		cy.get('input[data-testid=FlightPAX__ContactDetails__LastNameInput]').should('be.visible').type('Cameron').should('have.value', 'Cameron')
		cy.get('input[data-testid=FlightPAX__ContactDetails__EmailInput]').should('be.visible').type('john.cameron@gmail.com').should('have.value', 'john.cameron@gmail.com')
		cy.get('input[data-testid=FlightPAX__ContactDetails__MobileNumberInput]').should('be.visible').type('527165643',({force: true})).should('have.value', '527165643')
		cy.log('Proceeding for payment')
		cy.get('button[data-testid=FlightPAX__ContinueToPaymentButton]').click({force: true})
		cy.wait(1000)  
		cy.get('input[data-testid=FlightPAX__Adult1__MiddleNameInput]').click({force: true})
// below code validates that error messages are shown for traveller
// details section
        cy.log('Starting field level validations for mandatory data')
		cy.get('div[data-testid=FlightPAX__Adult1__FirstNameErrorLabel]').should('be.visible').invoke('text').should('eq','Please enter the first name')  
		cy.get('div[data-testid=FlightPAX__Adult1__LastNameErrorLabel]').should('be.visible').invoke('text').should('eq','Please enter the last name')
		cy.get('body').then((body) => 
		{ if (body.find('div[data-testid=FlightPAX__Adult1__DOBErrorLabel]').length > 0) 
		{ 
			cy.get('div[data-testid=FlightPAX__Adult1__DOBErrorLabel]').should('be.visible').invoke('text').should('eq','Please enter the date of birth')
		}})
         cy.get('body').then((body) => 
		{ if (body.find('div[data-testid=FlightPAX__Adult1__DOBErrorLabel]').length > 0) 
		{ 
			cy.get('div[data-testid=FlightPAX__Adult1__DOBErrorLabel]').should('be.visible').invoke('text').should('eq','Please enter the date of birth')
		}})		
		cy.get('body').then((body) => 
		{ if (body.find('div[data-testid=FlightPAX__Adult1__NationalityErrorLabel]').length > 0) 
		{ 
			cy.get('div[data-testid=FlightPAX__Adult1__NationalityErrorLabel]').should('be.visible').invoke('text').should('eq','Please select a nationality')
		}})	
		cy.get('body').then((body) => 
		{ if (body.find('div[data-testid=FlightPAX__Adult1__DocumentNumberErrorLabel]').length > 0) 
		{ 
			cy.get('div[data-testid=FlightPAX__Adult1__DocumentNumberErrorLabel]').should('be.visible').invoke('text').should('eq', 'Passport number is required')
		}})	
		cy.get('body').then((body) => 
		{ if (body.find('div[data-testid=FlightPAX__Adult1__DocumentCountryErrorLabel]').length > 0) 
		{ 
			cy.get('div[data-testid=FlightPAX__Adult1__DocumentCountryErrorLabel]').should('be.visible').invoke('text').should('eq','Please select the issuing country')
		}})	
		cy.get('body').then((body) => 
		{ if (body.find('div[data-testid=FlightPAX__Adult1__DocumentExpiryErrorLabel]').length > 0) 
		{ 
			cy.get('div[data-testid=FlightPAX__Adult1__DocumentExpiryErrorLabel]').should('be.visible').invoke('text').should('eq','Please enter the expiry date')
		}})	
		})
		})