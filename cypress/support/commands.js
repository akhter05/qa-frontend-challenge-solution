
//this command navigate to the provided URL from command line and update language to English
Cypress.Commands.add('navigateAndChangeLanguage', (baseURLPassed, options = {}) => 
{
   
	    var base_URL_CL = 'https://tajawal.com?ncr=1'
		if(baseURLPassed != null){
			base_URL_CL	= 'https://' + baseURLPassed + '?ncr=1' 
			cy.log('Base URL from CLI is ' + baseURLPassed)
			cy.visit(String(base_URL_CL))
			cy.wait(1000)  
		}   else
		{
			 base_URL_CL = 'https://tajawal.com?ncr=1'
		     cy.log('Base URL from Cypress.JSON file is being used')
			 cy.visit('/')
			 cy.wait(1000)  

		}	

	if(base_URL_CL.includes('tajawal'))
	{
		// Assert the URL for tajawal
		cy.url().should('include', 'tajawal')	  
		cy.get('a[data-testid=Header__LanguageSwitch]')
		.then(($seletecdlanguage) => {
			if ($seletecdlanguage.text().includes('العربية')) {
				cy.log('Website is shown in English language, proceeding with the test')
			}
			else
			{
				// Assert the URL for tajawal and update language
				cy.url().should('include', 'tajawal')	
				cy.log('Website is in Arabic language, updating to English')
				cy.get('a[data-testid=Header__LanguageSwitch]').click({force: true}) 
				cy.wait(1000)   
			}
		})
	}
	else
	{
// Assert the URL for almosafer and update language
		cy.url().should('include', 'almosafer')
		cy.log('Website is in Arabic language, updating Language to English')
		cy.get('button[data-testid=Header__LanguageSwitch]').click({force: true})
		cy.get('a').contains('English').click({force: true})
		cy.wait(2000)
		cy.log('Opening flight search tab')
		cy.get('a[data-testid=Header__FlightsNavigationTab]').click({force: true}).
		cy.wait(1000)  
	}
})

// this command creates a string for from and to flight future dates and
// select from calender
Cypress.Commands.add('selectFromAndToFutureCalenderDates', (datePrefix, options = {}) => 
{
	cy.log('Calculating future dates for flight search and selecting from calender')
	var fromDate = new Date();
	var toDate = new Date();
	fromDate.setDate(fromDate.getDate() + 10) 
	toDate.setDate(toDate.getDate() + 11) 
	var dd = String(fromDate.getDate()).padStart(2, '0');
	var mm = String(fromDate.getMonth() + 1).padStart(2, '0'); 
	var yyyy = fromDate.getFullYear();
	fromDate =  yyyy + '-' + mm + '-' + dd;
	var finalFromDateElementStr = datePrefix + fromDate;
	dd = String(toDate.getDate()).padStart(2, '0');
	mm = String(toDate.getMonth() + 1).padStart(2, '0'); 
	yyyy = toDate.getFullYear();
	toDate =  yyyy + '-' + mm + '-' + dd;
	var finalToDateElementStr = datePrefix + toDate;
	cy.get('div[data-testid=FlightSearchBox__FromDateButton]').click() 
	cy.get('span[data-testid=' + finalFromDateElementStr + ']').click()
	cy.wait(1000)   
	cy.get('span[data-testid=' + finalToDateElementStr + ']').click()
	cy.wait(1000)      

})

// this command fill in the flight details from fixture and initiate search
// for flight
Cypress.Commands.add('fillAndSearchFlights', (flightdata, options = {}) => 
{
    cy.log('Entering random criteria from Fixture file for flight search')
	cy.get('a[data-testid=Header__FlightsNavigationTab]').click({force: true})
	cy.get('div[data-testid=FlightSearchBox__RoundTripButton]').should('be.visible')  
	cy.get('button[data-testid=FlightSearchBox__FareCalendarTooltip]').should('be.visible').click() 
	cy.wait(1000)     
// generate a random integer less than stored number of flight destination
// and flight origin arrays and fetch from fixture
	const random = Math.floor(Math.random() * (4 - 0 + 1)) + 0; 
	cy.get('input[data-testid=FlightSearchBox__FromAirportInput]').click().should('be.visible').and('be.focused')   
	cy.get('input[data-testid=FlightSearchBox__FromAirportInput]').clear()	
	cy.get('input[data-testid=FlightSearchBox__FromAirportInput]').type(flightdata.origin[random] + '{enter}')
	cy.wait(1000)  
	cy.get('input[data-testid=FlightSearchBox__ToAirportInput]').click().should('be.visible').and('be.focused')   
	cy.get('input[data-testid=FlightSearchBox__ToAirportInput]').clear()	
	cy.get('input[data-testid=FlightSearchBox__ToAirportInput]').type(flightdata.destination[random]  + '{enter}')
	cy.wait(1000)  
// below line select random future dates from calender by calling custom
// command
	cy.selectFromAndToFutureCalenderDates("FlightSearchCalendar__")
// Search for flights with entered criteria
    cy.log('Submitting for flight search')
	cy.get('button[data-testid=FlightSearchBox__SearchButton]').first().should('be.visible').click()
	cy.wait(2000)   
})