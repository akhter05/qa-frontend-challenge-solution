describe('Scenario: cheapest flight price validation', function() {

	before(function() {
// this will get the flight data from fixture file flightdetails.json
		cy.fixture('flightdetails').as('flightdata')
// get the URL from command line and launch web application by calling
// custom command
		cy.navigateAndChangeLanguage(Cypress.env('api_server'))
	})

	it('search flights with random input data on flights home page', function() {
// below method calls the custom command to fill random details from
// fixture and search flights
		cy.fillAndSearchFlights(this.flightdata)

	})

	it('sort by cheapeast flight and do validation from listing page ',
			function() {
// sort by cheapest price
          cy.log('Sorting by cheapest flight')
				cy.get('button[align=trailing]').last().click({
					force : true
				})
				cy.get('button[type=button]').first().click()
				cy.wait(1000)		
			})
})