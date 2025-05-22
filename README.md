# Legal Nexus India Web Scraper

A comprehensive tool for scraping legal data from various Indian court websites. This scraper supports extracting judgments, case statuses, and other legal documents from multiple sources including High Courts (E-Courts), Supreme Court, and Indian Kanoon.

## Features

- Scrape data from multiple Indian court websites
- Support for various search criteria (case number, date, keywords)
- Download judgments and legal documents
- Save results in structured formats (JSON, CSV)
- Multilingual support
- Configurable rate limiting to avoid server overload

## Supported Sources

- **E-Courts** (High Courts) - https://hcservices.ecourts.gov.in/ecourtindiaHC/
- **Supreme Court of India** - https://main.sci.gov.in/
- **Indian Kanoon** - https://indiankanoon.org/

## Installation

### Prerequisites

- Python 3.7 or higher
- Chrome WebDriver (for Selenium)

### Setup

1. Clone this repository:
   ```
   git clone https://github.com/your-username/legal-nexus-india.git
   cd legal-nexus-india
   ```

2. Install required packages:
   ```
   pip install -r requirements.txt
   ```

3. Install Chrome WebDriver for Selenium:
   - Download the appropriate version for your Chrome browser from https://sites.google.com/chromium.org/driver/
   - Add it to your system PATH or specify its location when using the scraper

## Usage

### Command Line Interface

The scraper provides a command-line interface for easy use:

```bash
python web_scraper.py --source <source> [options]
```

### Basic Examples

#### List Available High Courts

```bash
python web_scraper.py --source ecourts --list-courts
```

#### Search E-Courts by Case Number

```bash
python web_scraper.py --source ecourts --state-code 1 --court-code 1 --case-type 1 --case-number 12345 --case-year 2022
```

#### Search Supreme Court Judgments by Query

```bash
python web_scraper.py --source supreme_court --query "intellectual property" --date-from 01-01-2022 --date-to 31-12-2022 --pages 5
```

#### Search Indian Kanoon

```bash
python web_scraper.py --source indian_kanoon --query "patent infringement" --date-from 01-01-2022 --date-to 31-12-2022 --pages 3
```

### Options

- `--source`: Data source to scrape (`ecourts`, `supreme_court`, `indian_kanoon`)
- `--output`: Output directory for scraped data
- `--query`: Search query
- `--date-from`: Start date (DD-MM-YYYY)
- `--date-to`: End date (DD-MM-YYYY)
- `--state-code`: State code for E-Courts
- `--court-code`: Court code for E-Courts
- `--case-type`: Case type for E-Courts
- `--case-number`: Case number for E-Courts
- `--case-year`: Case year for E-Courts
- `--order-date`: Order date for E-Courts (DD-MM-YYYY)
- `--page`: Starting page number
- `--pages`: Number of pages to scrape
- `--delay`: Delay between requests in seconds
- `--list-courts`: List available courts
- `--headless`: Run in headless mode (no browser UI)

## Using as a Library

You can also use the scraper as a Python library in your own code:

```python
from web_scraper import ECourtsScraper, SupremeCourtScraper, IndianKanoonScraper

# Initialize a scraper
ecourts = ECourtsScraper(output_dir="data/ecourts", delay=2)

# Get the list of courts
courts = ecourts.get_courts_list()

# Search for cases
cases = ecourts.search_by_case_number(
    state_code="1", 
    court_code="1", 
    case_type="1", 
    case_number="12345", 
    case_year="2022"
)

# Save the results
ecourts.save_json(cases, "my_search_results")
```

## Output Format

The scraped data is saved in JSON format with the following structure:

### E-Courts Case Search

```json
[
  {
    "case_number": "WP(C) 12345/2022",
    "petitioner": "John Doe",
    "respondent": "State",
    "filing_date": "01-01-2022",
    "status": "Pending",
    "link": "https://..."
  },
  ...
]
```

### Supreme Court Judgment Search

```json
[
  {
    "diary_number": "12345/2022",
    "case_number": "WP(C) 67890/2022",
    "parties": "John Doe Vs. State",
    "judgment_date": "15-02-2022",
    "pdf_link": "https://..."
  },
  ...
]
```

### Indian Kanoon Search

```json
{
  "results": [
    {
      "title": "John Doe vs State Of Maharashtra on 15 February, 2022",
      "url": "https://indiankanoon.org/doc/...",
      "court": "Supreme Court of India",
      "date": "15 Feb, 2022"
    },
    ...
  ],
  "pagination": {
    "current_page": 1,
    "total_pages": 10
  },
  "query": "patent infringement",
  "formatted_date": "fromdate:2022-01-01 todate:2022-12-31"
}
```

## Legal and Ethical Considerations

When using this scraper, please:

1. Respect the terms of service of each website
2. Implement appropriate rate limiting to avoid overloading servers
3. Use the data for legal/research purposes only
4. Be aware that some websites may have restrictions on automated access

## Requirements

Create a `requirements.txt` file with the following dependencies:

```
requests>=2.28.1
beautifulsoup4>=4.11.1
selenium>=4.4.3
pandas>=1.5.0
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [E-Courts Services](https://hcservices.ecourts.gov.in/ecourtindiaHC/)
- [Supreme Court of India](https://main.sci.gov.in/)
- [Indian Kanoon](https://indiankanoon.org/)
