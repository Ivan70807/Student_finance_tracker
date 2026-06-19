# Student Finance Tracker

## Features
- Transaction tracking
- Regex search
- Sorting
- Budget cap alerts
- Import/Export JSON
- Dark mode

## Regex Used
- Description: /^\S(?:.*\S)?$/
- Amount: ^(0|[1-9]\d*)(\.\d{1,2})?$
- Date: ^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$
- Category: /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/
- Duplicate words: /\b(\w+)\s+\1\b/i

## Keyboard
- ESC → clear search

## Accessibility
- Semantic HTML
- ARIA live regions
- Keyboard navigation support

## Run
Open index.html in browser