import { gql } from '@apollo/client'

export const BEER_CARD_PARTS = gql`
	fragment BeerCardParts on Beer {
		id
		name
		abv
		ibu
		breweries {
			name
		}
		style {
			shortName
		}
		labels {
			medium
		}
	}
`

export const BREWERY_CARD_PARTS = gql`
	fragment BreweryCardParts on Brewery {
		id
		name
		website
		locations {
			locationType
			locationTypeDisplay
			locality
			region
			country {
				isoCode
				displayName
			}
		}
		images {
			squareMedium
		}
	}
`

export const BREWERY_FILTER_CARD_PARTS = gql`
	fragment BreweryFilterCardParts on BreweryLocation {
		id
		name
		locationType
		locationTypeDisplay
		locality
		region
		country {
			isoCode
			displayName
		}
		brewery {
			id
			name
			website
			images {
				squareMedium
			}
		}
	}
`
