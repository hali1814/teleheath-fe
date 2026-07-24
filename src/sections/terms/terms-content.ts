// General Terms and Conditions for the MetHealth Services.
//
// Source of truth: /terms-condition/en.docx and /terms-condition/kh.docx (provided by BA).
// This is the legal text rendered inside the in-app WebView (Terms of Use +
// Privacy Policy links). Only the two languages that exist in the source
// documents are provided here: English (`en`) and Khmer (`km`).
//
// Clause 9 (Personal Data Protection and Privacy) carries `id: 'privacy'` so the
// native "Privacy Policy" link can deep-link to it via `#privacy`.
//
// Per Clause 14.5 / 14.2, the English version prevails in case of any conflict.

export type TermsBlock =
  | { type: 'para'; text: string }
  | { type: 'item'; label: string; text: string }
  | { type: 'def'; term: string; text: string }

export interface TermsSection {
  /** Anchor id, e.g. `privacy` for the personal-data clause. */
  id?: string
  /** Display clause number (localized numerals for Khmer). */
  num: string
  title: string
  blocks: TermsBlock[]
}

export interface TermsDoc {
  title: string
  effectiveDateLabel: string
  sections: TermsSection[]
}

export const PRIVACY_SECTION_ID = 'privacy'

const en: TermsDoc = {
  title: 'GENERAL TERMS AND CONDITIONS FOR THE METHEALTH SERVICES',
  effectiveDateLabel: 'Effective as of 01/07/2026',
  sections: [
    {
      num: '1',
      title: 'DEFINITIONS AND INTERPRETATION',
      blocks: [
        {
          type: 'para',
          text: `In these Terms and Conditions, unless the context otherwise requires:`,
        },
        {
          type: 'def',
          term: `"App"`,
          text: `means the MetHealth mobile application and any related web platform developed, owned and operated by the Company which enable the Customer to request, book, manage the service request and receive notifications of the Services.`,
        },
        {
          type: 'def',
          term: `"Applicable Laws"`,
          text: `means all laws, regulations, and directives issued by Cambodian authorities that are applicable to the entering into and/or the performance of the Services.`,
        },
        {
          type: 'def',
          term: `"Basic Information"`,
          text: `means the Customer's basic personal data collected and processed by the Company for the purpose of providing the Services, including without limitation full name, date of birth, gender, nationality, identification number (national ID card or passport), residential or contact address, telephone number, email address, App login credentials, booking history and preferred language.`,
        },
        {
          type: 'def',
          term: `"Booking"`,
          text: `means a request placed by the Customer through the App or the Hotline for one or more of the Services.`,
        },
        {
          type: 'def',
          term: `"Company"`,
          text: `means Viettel (Cambodia) Pte. Ltd., a company registered under the laws of the Kingdom of Cambodia, with its principal place of business at Building 199, Street 245, Sangkat Toul Svay Prey II, Khan Boeung Keng Kang, Phnom Penh, the Kingdom of Cambodia.`,
        },
        {
          type: 'def',
          term: `"Customer"`,
          text: `means any customer who uses, registers for, books or receives the Services, whether through the App or the Hotline.`,
        },
        {
          type: 'def',
          term: `"Force Majeure"`,
          text: `means any objective event beyond the reasonable control of the Company, which could not have been foreseen, including but not limited to storms, floods, fires, explosions, epidemics, wars, droughts, other natural disasters, compliance with orders or decisions of competent state authorities, strikes, traffic accidents, and operational disruptions not caused by the fault of the Company (including illegal intrusion by third parties into the Company's systems or technical equipment, widespread power grid failures, or widespread internet outages). The Company shall not be deemed to be in breach of its obligations, nor be liable to the Customer for any delay or failure in performing any of its obligations in the Services, to the extent caused by a Force Majeure Event.`,
        },
        {
          type: 'def',
          term: `"Hotline"`,
          text: `means the customer service telephone number 0978 119 119 or any replacement number notified by the Company.`,
        },
        {
          type: 'def',
          term: `"Medical Records"`,
          text: `means the Customer's health-related personal data, including but not limited to medical history, examination results, diagnoses, prescriptions, imaging files, laboratory test results, and other clinical information generated, collected or held by a Partner Hospital in connection with the Customer's care.`,
        },
        {
          type: 'def',
          term: `"Partner Hospital"`,
          text: `means any hospital, clinic or medical facility located in Cambodia or Vietnam that has entered into a written cooperation agreement with the Company for the purpose of Customer referral and/or receiving Customers introduced.`,
        },
        {
          type: 'def',
          term: `"Personal Data"`,
          text: `means Basic Information and, where applicable, Medical Records.`,
        },
        {
          type: 'def',
          term: `"Services" / "MetHealth Services"`,
          text: `means one, some or all of the services described in Clause 3 of these Terms and Conditions.`,
        },
        {
          type: 'def',
          term: `"Service Fees"`,
          text: `means the payable fees charged by the Company to the Customer for the Services, as quoted at the time of Booking.`,
        },
        {
          type: 'def',
          term: `"Third-party Service Providers"`,
          text: `means independent third parties engaged to provide to the Customer through the Company the interpretation services, transportation services, accommodation services, and any other related services in connection with the Customer's medical examination, treatment, care with the Partner Hospital.`,
        },
        {
          type: 'def',
          term: `"Working Day"`,
          text: `means a day (other than a Saturday, Sunday or any gazette public holiday in Cambodia) on which commercial banks are generally open for business in Cambodia.`,
        },
        {
          type: 'para',
          text: `Headings are for convenience only and do not affect interpretation. Words in the singular include the plural and vice versa. References to law includes amendments and re-enactments of Applicable Laws.`,
        },
      ],
    },
    {
      num: '2',
      title: 'APPLICATION AND ACCEPTANCE',
      blocks: [
        {
          type: 'para',
          text: `These Terms and Conditions apply to all Services provided by the Company to Customers. By using, booking or receiving the Services, the Customer acknowledges that they have read, understood and agreed to be bound by these Terms and Conditions.`,
        },
      ],
    },
    {
      num: '3',
      title: 'SCOPE OF SERVICES',
      blocks: [
        {
          type: 'item',
          label: '3.1',
          text: `The Services consist of the following non-medical support services:`,
        },
        {
          type: 'item',
          label: '(a)',
          text: `Hospital Connection Service: introduction and/or referral of the Partner Hospital in Cambodia and Vietnam by the Company to the Customer, and facilitation of medical appointment Bookings by the Customer through the App and/or Hotline by provision of administrative guidance on the basic process to book with the Partner Hospital, and any possible non-clinical or non-health related information.`,
        },
        {
          type: 'item',
          label: '(b)',
          text: `Interpretation Service: Vietnamese-Khmer interpretation services provided to the Customer in connection with medical examination, treatment and care ("Medical Care"), and administrative procedures at a Partner Hospital.`,
        },
        {
          type: 'item',
          label: '(c)',
          text: `Transportation Service: arrangement of land transportation between Cambodia and Vietnam and within Vietnam for the Customer where the Customer travels to Vietnam to receive medical care from a Partner Hospital in Vietnam.`,
        },
        {
          type: 'item',
          label: '(d)',
          text: `Accommodation Service: arrangement of accommodation in Vietnam for the Customer where the Customer travels to Vietnam to receive medical care from a Partner Hospital in Vietnam.`,
        },
        {
          type: 'item',
          label: '3.2',
          text: `The Services are delivered through the Company's App and/or the Hotline. The Company may add, modify or discontinue any Service at any time by giving prior notice in general to Customer through the App or any other social media platforms, provided that any change shall not affect the Bookings that already confirmed before the change takes effect.`,
        },
        {
          type: 'para',
          text: `The Company solely provides a platform facilitating the connection between Customer, Partner Hospital and Third-party Service Providers, through the App and Hotline. The Company is not a consultation room, hospital, clinic, medical facility, healthcare professional, insurer, or health facility, and does not assume any medical, clinical or treatment-related responsibility or liability in respect of any services provided by Partner Hospital. All information provided through the App or Hotline is for administrative and facilitation purposes only and shall not be construed as medical advice, diagnosis, treatment and/or clinical consultation.`,
        },
      ],
    },
    {
      num: '4',
      title: 'CUSTOMER OBLIGATIONS',
      blocks: [
        { type: 'para', text: `The Customer warrant and undertakes to:` },
        {
          type: 'item',
          label: '4.1',
          text: `provide valid, complete, true, accurate and up-to-date information including but not limited to: (a) basic Information, (b) medical history/records, (c) information on healthcare spending capacity and (d) other necessary information, when placing a Booking via registration on the App or via the Hotline;`,
        },
        {
          type: 'item',
          label: '4.2',
          text: `use the Services only for lawful and personal purposes and not for any commercial, illegal, abusive or fraudulent purpose;`,
        },
        {
          type: 'item',
          label: '4.3',
          text: `comply with the booking rules and related rules of each and respective Partner Hospital, and all reasonable instructions issued by the Company or the Partner Hospital in connection with the Services;`,
        },
        {
          type: 'item',
          label: '4.4',
          text: `pay all Service Fees and any other amounts due to the Company on time and in accordance with Clause 5, and pay the Partner Hospital directly for all the Medical Care and/or medical services received in accordance with Clause 7;`,
        },
        {
          type: 'item',
          label: '4.5',
          text: `attend all confirmed appointments in a timely manner and cancel or reschedule any appointment only in accordance with Clause 6;`,
        },
        {
          type: 'item',
          label: '4.6',
          text: `obtain and maintain a valid passport and any visa or other entry documents required for cross-border transportation between Cambodia and Vietnam, and comply with all applicable laws and regulations of Vietnam and Cambodia including but not limited to immigration, customs and public health requirements;`,
        },
        {
          type: 'item',
          label: '4.7',
          text: `treat the Company's staff, the Partner Hospital's staff, drivers, interpreters and other service providers with respect, and refrain from any conduct that may endanger the health, safety, well-being or dignity of others;`,
        },
        {
          type: 'item',
          label: '4.8',
          text: `keep the App login credentials strictly confidential and notify the Company immediately of any unauthorized use and access of the Customer's account;`,
        },
        {
          type: 'item',
          label: '4.9',
          text: `not copy, reverse-engineer, decompile, modify or interfere with the App, the Hotline systems or any of the Company's platforms; and`,
        },
        {
          type: 'item',
          label: '4.10',
          text: `where the Customer books or uses the Services on behalf of another person, the Customer shall represent and warrant that such person has been fully informed of and agrees to these Terms and Conditions, and that the Customer has full authority to act for and bind such person in relation to the Service.`,
        },
      ],
    },
    {
      num: '5',
      title: 'BOOKING, CHARGES AND PAYMENT',
      blocks: [
        {
          type: 'item',
          label: '5.1',
          text: `Booking. A Booking is confirmed only after (i) the Customer has accepted these Terms and Conditions; (ii) the Customer has fully paid all applicable Service Fees relating to the Booking; and (iii) the Company has issued confirmation through the App, hotline or telegram (if any).`,
        },
        {
          type: 'item',
          label: '5.2',
          text: `Medical Care service fees to the Partner Hospital. Fees for Medical Care services are determined and charged solely by the Partner Hospital. The Customer shall pay such fees directly to the Partner Hospital, in accordance with the Partner Hospital's policies and requirements. The Customer acknowledges that the Company is not a party to, and bears no responsibility for, any payment made by the Customer to the Partner Hospital for any medical services and the related services, and that the Company does not receive any portion of such service fees from the Customer.`,
        },
        {
          type: 'item',
          label: '5.3',
          text: `Service Fees payable to the Company.`,
        },
        {
          type: 'para',
          text: `The Customer shall pay the Company directly for the Services, as applicable, which may include any one or more of the following Services depending on the Customer's request and actual use: (i) Vietnamese-Khmer interpretation services; (ii) transportation services; and (iii) accommodation arrangement services, in accordance with the price quoted at the time of Booking. All Service Fees are payable in United States Dollars (USD). Payment shall be made through the payment methods made available on the App. If additional payment methods become available, the Company shall notify the Customer through the Company's official Hotline or such other official communication channels as may be designated by the Company from time to time.`,
        },
        {
          type: 'para',
          text: `The Customer acknowledges and agrees that the quoted Service Fees cover only the specific Services confirmed at the time of Booking. The Customer shall be solely responsible for, and shall pay directly to the relevant service provider, any additional personal, incidental, optional, or supplementary charges incurred during the use of the Services, including but not limited to minibar consumption, laundry services, telephone charges, room service, food and beverages, parking fees, tolls, excess baggage charges, overtime requests, gratuities, damages, penalties, or any other goods or services not expressly included in the confirmed Booking. The Company shall not be responsible for any such additional charges and shall have no obligation to advance, reimburse, or settle any amounts owed by the Customer to any Third-party Service Provider.`,
        },
        {
          type: 'para',
          text: `The Customer acknowledges and agrees that the Company shall not be liable any loss, damage, fraud, or unauthorized transactions arising from communications, payment instructions, or requests received from any person, telephone number, or channel that is not officially authorized by the Company.`,
        },
        {
          type: 'item',
          label: '5.4',
          text: `Taxes. All Service Fees payable to the Company are inclusive of all applicable taxes including the value-added tax at the rate prescribed by Applicable Laws, unless otherwise expressly stated.`,
        },
      ],
    },
    {
      num: '6',
      title: 'CANCELLATION, RESCHEDULING AND REFUND',
      blocks: [
        {
          type: 'item',
          label: '6.1',
          text: `Cancellation or rescheduling of a medical appointment shall be governed by the policies of the relevant and respective Partner Hospital. The Customer shall comply with such policies, and any cancellation fees imposed by the Partner Hospital shall be paid directly and solely by the Customer to the Partner Hospital. The Company shall bear no liability for any refund possibility, decision, financial loss, or unpaid fees arising from the Customer's cancellation/action, or the Partner's Hospital's cancellation/action.`,
        },
        {
          type: 'item',
          label: '6.2',
          text: `The Customer may cancel or reschedule through the App of any booked interpretation, transportation, accommodation service, or any combination thereof. In such case, the Customer shall be entitled to a refund of the applicable Service Fee in accordance with the refund schedule set out in the Policy provided through the App at the time of selecting such Services. For the avoidance of doubt, this Clause applies whether such Services are booked individually or together as part of the same Booking.`,
        },
        { type: 'item', label: '6.3', text: `Cancellation by the Company` },
        {
          type: 'para',
          text: `The Company reserves the rights and may cancel a confirmed Booking, without any refund of Service Fees paid by the Customer, in any of the following cases:`,
        },
        {
          type: 'item',
          label: '(a)',
          text: `Customer breach: the Customer commits a material breach of these Terms and Conditions, including without limitation: (a) the provision of false, invalid, incomplete or misleading information at registration or Booking; (b) abusive, threatening, violent or harmful conduct directed at the Company's staff, the Partner Hospital's staff, an interpreter, a driver or any other person engaged in connection with the Services; and (c) use of the Services for any unlawful purpose;`,
        },
        {
          type: 'item',
          label: '(b)',
          text: `Fraud: the Customer obtains, or the Company reasonably suspects that the Customer has obtained, the Services or any Booking by fraud, forgery, identity misuse or any other dishonest means;`,
        },
        {
          type: 'item',
          label: '(c)',
          text: `Withdrawal of consent: the Customer withdraws consent for the processing of Basic Information required for the provision of the Services under Clause 9, and such withdrawal makes it impossible for the Company to continue providing the Services or to maintain the Booking; or`,
        },
        {
          type: 'item',
          label: '(d)',
          text: `Refusal of Entry or Departure by Authorities: any competent authority of Cambodia or Vietnam denies the Customer entry to, or exit from either country.`,
        },
      ],
    },
    {
      num: '7',
      title: 'MEDICAL SERVICES PROVIDED BY PARTNER HOSPITAL',
      blocks: [
        {
          type: 'item',
          label: '7.1',
          text: `All medical services received by the Customer are provided directly by the relevant Partner Hospital under a separate contractual relationship between the Customer and such Partner Hospital. Such relationship is governed by the policies, terms, consent forms of the Partner Hospital and the laws of the country in which the services are provided. The Customer acknowledges that the Company is not a party to such relationship.`,
        },
        {
          type: 'item',
          label: '7.2',
          text: `The Company has no control over and assumes no responsibility or liability for any medical services provided by Partner Hospital, including without limitation the quality of care, diagnosis, treatment, medication, medical outcomes, or fees charged. To the maximum extent permitted by Applicable Law, the Company shall have no liability for any act, omission, negligence or misconduct of any Partner Hospital, doctor or medical staff.`,
        },
        {
          type: 'item',
          label: '7.3',
          text: `The Customer is solely responsible for evaluating the suitability of any Partner Hospital before confirming a Booking. The Company makes no representation or warranty, express or implied, regarding the qualifications of medical personnel, safety or outcome of any treatment, or accuracy of information relating to Partner Hospital displayed on the App.`,
        },
        {
          type: 'item',
          label: '7.4',
          text: `The Customer shall obtain and maintain any health insurance, travel insurance or other coverage at its own discretion and as required by the Applicable Law (if any). The Company does not provide insurance and shall have no liability for any medical, hospitalization, repatriation or other related costs incurred by the Customer.`,
        },
        {
          type: 'item',
          label: '7.5',
          text: `Any complaint, claim or dispute relating to medical services shall be addressed directly by the Customer to the relevant Partner Hospital. The Company shall have no liability whatsoever in connection with such matters.`,
        },
      ],
    },
    {
      num: '8',
      title: 'TRANSPORTATION, ACCOMMODATION AND INTERPRETATION SERVICES',
      blocks: [
        {
          type: 'item',
          label: '8.1',
          text: `Where the Customer books transportation, accommodation or interpretation services in connection with travel to a Partner Hospital in Vietnam, such services shall be provided by Third-party Service Providers contracted with the Company. The Company shall use reasonable efforts to procure proper performance of such Services in accordance with the Booking confirmation.`,
        },
        {
          type: 'item',
          label: '8.2',
          text: `The Company's liability for any loss or damage relating to transportation, accommodation or interpretation services due to the fault of the Company shall not exceed the Service Fee paid by the Customer for that specific service.`,
        },
      ],
    },
    {
      id: PRIVACY_SECTION_ID,
      num: '9',
      title: 'PERSONAL DATA PROTECTION AND PRIVACY',
      blocks: [
        {
          type: 'item',
          label: '9.1',
          text: `The Customer hereby acknowledges and consents to the collection, use, storage, and processing of Personal Data of the Customer by the Company for the purposes of providing Services in accordance with the Applicable Laws. The Customer shall indemnify and hold harmless the Company against any loss, damage, cost, or liability arising from the Customer's breach of the warranties set out in this clause.`,
        },
        {
          type: 'item',
          label: '9.2',
          text: `Consent to processing of Personal Data:`,
        },
        {
          type: 'para',
          text: `By accepting these Terms and Conditions and/or using the Services, the Customer expressly consents to the collection, use, storage and other processing by the Company of the Customer's Basic Information for the purposes set out in Clause 9.3 below.`,
        },
        {
          type: 'para',
          text: `The provision of Medical Records by the Customer is voluntary. The Customer may choose whether or not to authorise a Partner Hospital to transfer the Customer's Medical Records to the Company for storage and processing through the App.`,
        },
        {
          type: 'para',
          text: `Where the Customer provides such authorisation to a Partner Hospital, the Company shall be entitled to receive, store, use and otherwise process the relevant Medical Records for the purposes set out in Clause 9.4 below, and the Company shall not be required to obtain any separate or additional consent directly from the Customer for such processing. The Company may rely on any consent form, authorisation document or other confirmation provided by the relevant Partner Hospital as evidence that the Customer has consented to such transfer and processing of Medical Records.`,
        },
        {
          type: 'para',
          text: `For the avoidance of doubt, if the Customer does not authorise the transfer of Medical Records, the Customer may still use the Services; however, certain functions or features relating to medical record storage, access or continuity of care shall not be available.`,
        },
        {
          type: 'item',
          label: '9.3',
          text: `Processing of Basic Information`,
        },
        {
          type: 'para',
          text: `By accepting these Terms and Conditions, the Customer authorises the Company to:`,
        },
        {
          type: 'item',
          label: '(a)',
          text: `collect and store the Customer's Basic Information through the App and the Hotline;`,
        },
        {
          type: 'item',
          label: '(b)',
          text: `use the Basic Information to register and manage the Customer's account, process Bookings, issue receipts and invoices, communicate with the Customer regarding the Services, handle complaints, detect and prevent fraud or abuse, and comply with Applicable Laws;`,
        },
        {
          type: 'item',
          label: '(c)',
          text: `share the Basic Information with the relevant Partner Hospital strictly to the extent necessary to enable the Partner Hospital to receive, identify and provide medical services to the Customer;`,
        },
        {
          type: 'item',
          label: '(d)',
          text: `share the Basic Information with the Company's authorised service providers (including transportation providers, accommodation providers, interpreters, payment processors and IT service providers) strictly to the extent necessary to perform the relevant Services, subject to confidentiality and data protection obligations imposed on such service providers; and`,
        },
        {
          type: 'item',
          label: '(e)',
          text: `disclose the Basic Information to competent authorities where required by Applicable Laws or by a binding order of a court or regulatory body.`,
        },
        {
          type: 'item',
          label: '9.4',
          text: `Processing of Medical Records`,
        },
        {
          type: 'para',
          text: `Where the Customer has authorised a Partner Hospital to transfer the Customer's Medical Records to the Company, the Company shall be authorised to:`,
        },
        {
          type: 'item',
          label: '(a)',
          text: `receive Medical Records transmitted by the Partner Hospital;`,
        },
        {
          type: 'item',
          label: '(b)',
          text: `store Medical Records on secure systems;`,
        },
        {
          type: 'item',
          label: '(c)',
          text: `make Medical Records available to the Customer through the App in accordance with the Customer's access rights;`,
        },
        {
          type: 'item',
          label: '(d)',
          text: `transmit Medical Records to another Partner Hospital at the Customer's request for the purposes of further treatment, consultation or medical opinion; and`,
        },
        {
          type: 'item',
          label: '(e)',
          text: `disclose Medical Records to competent authorities only where required by Applicable Laws or by a binding order of a court or regulatory body.`,
        },
        {
          type: 'para',
          text: `The Company shall not use Medical Records for any purpose not expressly permitted under these Terms and Conditions or Applicable Laws.`,
        },
        {
          type: 'item',
          label: '9.5',
          text: `Where the Customer requests or authorises the Company to transfer the Customer's Medical Records or other Personal Data to a Partner Hospital located in Vietnam for the purposes of medical consultation, appointment booking, examination, treatment or related Services, the Customer shall be deemed to have expressly consented to such cross-border transfer of Personal Data between Cambodia and Vietnam.`,
        },
        {
          type: 'para',
          text: `The Company shall ensure that any such transfer is carried out through secure transmission channels and in compliance with the applicable laws and regulations of the Kingdom of Cambodia relating to data protection, privacy and electronic communications. The Company shall also implement reasonable technical and organizational measures to protect the confidentiality and security of the transferred Personal Data.`,
        },
        {
          type: 'item',
          label: '9.6',
          text: `Unless otherwise requested by the Customer or required by Applicable Laws, the Company may retain the Customer's Personal Data for a period of up to five (5) years from the date on which the last Booking made by the Customer has been completed or terminated. Upon expiry of the applicable retention period, or upon the Customer's official request where permitted by Applicable Laws, the Company shall use reasonable efforts to securely delete or destroy the relevant Personal Data, unless continued retention is required by Applicable Laws.`,
        },
      ],
    },
    {
      num: '10',
      title: 'DISCLAIMERS AND LIMITATION OF LIABILITY',
      blocks: [
        {
          type: 'item',
          label: '10.1',
          text: `To the extent permitted by Applicable Laws, the Services are provided on an "as available" basis. The Company does not warrant that the App or the Hotline will be uninterrupted, error-free or free from harmful components.`,
        },
        {
          type: 'item',
          label: '10.2',
          text: `The Company shall not be liable to the Customer for:`,
        },
        {
          type: 'item',
          label: '(a)',
          text: `any act, omission, performance, service quality, availability, negligence, misconduct or any loss or damage arising from the services provided by Third-party Service Providers as well as by any Partner Hospital or its personnel in connection with medical services provided to the Customer;`,
        },
        {
          type: 'item',
          label: '(b)',
          text: `any decision made by the Customer based on information displayed on the App or shared by a Partner Hospital;`,
        },
        {
          type: 'item',
          label: '(c)',
          text: `any loss arising from the Customer's failure to provide accurate Personal Data, to attend appointments, to comply with travel or visa requirements, or to follow medical instructions;`,
        },
        {
          type: 'item',
          label: '(d)',
          text: `any indirect, consequential, incidental, special, exemplary or punitive damages, including loss of profits, loss of opportunity, loss of reputation or loss of data; or`,
        },
        {
          type: 'item',
          label: '(e)',
          text: `any event of Force Majeure.`,
        },
        {
          type: 'item',
          label: '10.3',
          text: `The aggregate liability of the Company to the Customer in respect of any claim arising out of or in connection with these Terms and Conditions, regardless of the cause of action, shall not exceed an amount equal to the total Service Fees actually paid by the Customer to the Company in respect of the relevant Booking giving rise to the claim. Nothing in these Terms and Conditions limits or excludes liability that cannot lawfully be limited or excluded under Applicable Laws.`,
        },
      ],
    },
    {
      num: '11',
      title: 'INDEMNITY',
      blocks: [
        {
          type: 'para',
          text: `The Customer shall indemnify and hold harmless the Company, its affiliates and their respective directors, officers, employees and agents from and against all claims, losses, damages, liabilities, costs and expenses (including reasonable legal fees) arising out of or in connection with: (a) the Customer's breach of these Terms and Conditions; (b) any inaccurate, incomplete or misleading information provided by the Customer; (c) any claim by a Partner Hospital, a third-party service provider or any other person resulting from the Customer's act or omission; or (d) any violation by the Customer of Applicable Laws.`,
        },
      ],
    },
    {
      num: '12',
      title: 'COMPLAINTS',
      blocks: [
        {
          type: 'item',
          label: '12.1',
          text: `The Customer may submit a complaint relating to the Services through:`,
        },
        {
          type: 'item',
          label: '(a)',
          text: `the in-App customer support function;`,
        },
        {
          type: 'item',
          label: '(b)',
          text: `the Hotline 0978 119 119;`,
        },
        {
          type: 'item',
          label: '(c)',
          text: `email to info_customercare@metfone.com.kh; or`,
        },
        {
          type: 'item',
          label: '(d)',
          text: `written notice delivered to the Company's principal place of business.`,
        },
        {
          type: 'item',
          label: '12.2',
          text: `Any complaint shall be submitted within three (3) Working Days from the date of the event giving rise to the complaint. Complaints relating to medical services received from a Partner Hospital shall be addressed directly to the relevant Partner Hospital.`,
        },
        {
          type: 'item',
          label: '12.3',
          text: `The Company shall investigate and provide a written response to the Customer within seven (7) Working Days from receipt of a valid complaint, or in cases of exceptional complexity, within thirty (30) Working Days. The Customer and the Company shall use reasonable efforts to resolve any dispute amicably. If the Customer is not satisfied with the outcome of the complaint, the Customer may refer the dispute for resolution in accordance with Clause 13.`,
        },
        {
          type: 'item',
          label: '12.4',
          text: `The Customer shall not directly or indirectly publish, post, communicate, or otherwise disseminate any defamatory, derogatory, false, or misleading statements regarding the Company, its affiliates, or its respective officers, employees, agents, whether on social media, review platforms/App, or any other channels. The Customer acknowledges that any breach of this clause may cause irreparable harm to the Company and that the Company shall be entitled to seek all available legal and equitable remedies from the Customer.`,
        },
      ],
    },
    {
      num: '13',
      title: 'GOVERNING LAW AND DISPUTE RESOLUTION',
      blocks: [
        {
          type: 'item',
          label: '13.1',
          text: `These Terms and Conditions shall be governed by and construed in accordance with the laws of the Kingdom of Cambodia. If any provision of these Terms and Conditions is held invalid or unenforceable, such provision shall be severed and the remaining provisions shall remain in full force and effect.`,
        },
        {
          type: 'item',
          label: '13.2',
          text: `Any dispute arising out of or in connection with these Terms and Conditions, including any question regarding its existence, validity, performance or termination, shall be referred to and finally resolved by arbitration in the Kingdom of Cambodia in accordance with the Arbitration Rules of the National Commercial Arbitration Center ("NCAC") being in force at the time of commencement of arbitration and by reference in this clause the NCAC Rules are deemed to be incorporated as part of these Terms and Conditions. The arbitration tribunal will consist of one arbitrator. The arbitration shall be conducted in the English language. All costs incurred in the resolution of the dispute shall be borne entirely by the defaulting Party, unless the NCAC decides otherwise in accordance with the NCAC Arbitration Rules. The seat of the arbitration shall be Phnom Penh, the Kingdom of Cambodia.`,
        },
      ],
    },
    {
      num: '14',
      title: 'GENERAL PROVISIONS',
      blocks: [
        {
          type: 'item',
          label: '14.1',
          text: `All and any intellectual property, including trademarks, logos, copyrights, and material, owned by the Company shall remain the exclusive property of the Company.`,
        },
        {
          type: 'item',
          label: '14.2',
          text: `No failure or delay by the Company in exercising any right, power, or remedy under these Terms and Conditions, nor any continued performance of these Terms and Conditions, shall be construed as a waiver of such right, power, or remedy, including the right to claim compensation for any losses or damages arising from a breach of these Terms and Conditions.`,
        },
        {
          type: 'item',
          label: '14.3',
          text: `The Company reserves the right to amend these Terms and Conditions at any time by posting updated terms on the App and/or other Company's platforms. Notwithstanding the foregoing, the Terms and Conditions in force at the time the Services were accepted by the Company shall continue to govern and apply to the Services until the Services are fully completed.`,
        },
        {
          type: 'item',
          label: '14.4',
          text: `Nothing in the Terms and Conditions shall be interpreted as creating a partnership, joint venture, agency, independent contractor or employment relationship between the Company and the Customer. Each Party acts in its own name and for its own account and shall remain responsible for its own personnel, operations, and legal obligations. Neither Party is authorized to represent or bind the other Party in any manner.`,
        },
        {
          type: 'item',
          label: '14.5',
          text: `In the event of any translation of these Terms and Conditions, the English language version shall prevail in case of any conflict or inconsistency.`,
        },
      ],
    },
    {
      num: '15',
      title: 'ACKNOWLEDGMENT AND ACCEPTANCE',
      blocks: [
        {
          type: 'para',
          text: `By using, booking or receiving the Services, the Customer acknowledges that they have read, understood, and agreed to be bound by these Terms and Conditions.`,
        },
      ],
    },
  ],
}

const km: TermsDoc = {
  title: 'ខ និង លក្ខខណ្ឌទូទៅសម្រាប់ការប្រើប្រាស់សេវា METHEALTH',
  effectiveDateLabel: 'មានប្រសិទ្ធភាពចាប់ពី ០១ ខែកក្កដា ឆ្នាំ ២០២៦',
  sections: [
    {
      num: '១',
      title: 'និយមន័យ និងការបកស្រាយ',
      blocks: [
        {
          type: 'para',
          text: `នៅក្នុងខ និងលក្ខខណ្ឌនេះ លើកលែងតែខ្លឹមសារនៃបរិបទតម្រូវឱ្យមានការយល់ន័យផ្សេងពីនេះ៖`,
        },
        {
          type: 'def',
          term: `"កម្មវិធី (App)"`,
          text: `សំដៅលើ កម្មវិធីទូរស័ព្ទ MetHealth និងរាល់គេហទំព័រដែលពាក់ព័ន្ធ ដែលត្រូវបានអភិវឌ្ឍន៍ កាន់កាប់ និងគ្រប់គ្រងដោយក្រុមហ៊ុន ដើម្បីអនុញ្ញាតឱ្យអតិថិជនស្នើសុំ កក់ គ្រប់គ្រងការស្នើសុំសេវា និងទទួលការជូនដំណឹងអំពីសេវាកម្ម។`,
        },
        {
          type: 'def',
          term: `"ច្បាប់ជាធរមាន"`,
          text: `សំដៅលើ រាល់ច្បាប់ បទបញ្ញត្តិ និងសេចក្តីណែនាំដែលអនុម័តដោយអាជ្ញាធរកម្ពុជាដែលអាចអនុវត្តបាន និង/ឬពាក់ព័ន្ធនឹងការអនុវត្តសេវាកម្មនេះ។`,
        },
        {
          type: 'def',
          term: `"ព័ត៌មានមូលដ្ឋាន"`,
          text: `សំដៅលើ ទិន្នន័យផ្ទាល់ខ្លួនជាមូលដ្ឋានរបស់អតិថិជន ដែលបានប្រមូល និងដំណើរការដោយក្រុមហ៊ុនក្នុងគោលបំណងផ្តល់សេវាកម្ម រួមមាន ដោយមិនកំណត់ត្រឹមតែ ឈ្មោះពេញ ថ្ងៃខែឆ្នាំកំណើត ភេទ សញ្ជាតិ លេខអត្តសញ្ញាណ (អត្តសញ្ញាណបណ្ណសញ្ជាតិខ្មែរ ឬលិខិតឆ្លងដែន) អាសយដ្ឋានស្នាក់នៅ ឬអាសយដ្ឋានទំនាក់ទំនង លេខទូរស័ព្ទ អ៊ីម៉ែល ព័ត៌មានសម្រាប់ចូលប្រើប្រាស់កម្មវិធី ប្រវត្តិការកក់ និងភាសាដែលចង់ប្រើប្រាស់។`,
        },
        {
          type: 'def',
          term: `"ការកក់"`,
          text: `សំដៅលើ ការស្នើសុំដែលធ្វើឡើងដោយអតិថិជនតាមរយៈកម្មវិធី ឬ Hotline សម្រាប់សេវាកម្មមួយ ឬច្រើន។`,
        },
        {
          type: 'def',
          term: `"ក្រុមហ៊ុន"`,
          text: `សំដៅលើ ក្រុមហ៊ុន វៀតធេល (ខេមបូឌា) ដែលជាក្រុមហ៊ុនចុះបញ្ជីក្រោមច្បាប់នៃព្រះរាជាណាចក្រកម្ពុជា ដែលមានអាសយដ្ឋានចុះបញ្ជីស្ថិតនៅអគារលេខ ១៩៩ ផ្លូវលេខ ២៤៥ សង្កាត់ទួលស្វាយព្រៃទី ២ ខណ្ឌបឹងកេងកង រាជធានីភ្នំពេញ ព្រះរាជាណាចក្រកម្ពុជា។`,
        },
        {
          type: 'def',
          term: `"អតិថិជន"`,
          text: `សំដៅលើ អតិថិជនទាំងឡាយណាដែលប្រើប្រាស់ ចុះឈ្មោះ កក់ ឬទទួលសេវាកម្ម ទោះបីជាតាមរយៈកម្មវិធី ឬ Hotline ក៏ដោយ។`,
        },
        {
          type: 'def',
          term: `"ប្រធានសក្តិ"`,
          text: `សំដៅលើ ព្រឹត្តិការណ៍ណាមួយ ដែលក្រុមហ៊ុនមិនអាចជៀសវាងបាន ដែលមិនអាចមើលឃើញទុកជាមុន រួមមានជាអាទិ៍៖ ព្យុះ ទឹកជំនន់ ភ្លើងឆេះ ការផ្ទុះ ជំងឺរាតត្បាត សង្គ្រាម គ្រោះរាំងស្ងួត គ្រោះធម្មជាតិផ្សេងៗ ការអនុវត្តតាមបញ្ជា ឬសេចក្តីសម្រេចរបស់អាជ្ញាធររដ្ឋាភិបាលដែលមានសមត្ថកិច្ច ការធ្វើកូដកម្ម គ្រោះថ្នាក់ចរាចរណ៍ និងភាពរអាក់រអួលនៃប្រតិបត្តិការដែលមិនមែនបង្កឡើងដោយកំហុសរបស់ក្រុមហ៊ុន (រួមទាំងការចូលកាន់កាប់ដោយខុសច្បាប់ពីភាគីទីបីចូលទៅក្នុងប្រព័ន្ធ ឬឧបករណ៍បច្ចេកទេសរបស់ក្រុមហ៊ុន ការដាច់ចរន្តអគ្គិសនីទ្រង់ទ្រាយធំ ឬការដាច់អ៊ីនធឺណិតទ្រង់ទ្រាយធំ)។ ក្រុមហ៊ុនមិនត្រូវចាត់ទុកថាបានបំពានលើកាតព្វកិច្ចរបស់ខ្លួន ឬត្រូវទទួលខុសត្រូវចំពោះអតិថិជនចំពោះការយឺតយ៉ាវ ឬការខកខានក្នុងការអនុវត្តកាតព្វកិច្ចណាមួយក្នុងសេវាកម្ម ដែលបង្កឡើងដោយព្រឹត្តិការណ៍ប្រធានសក្តិនោះទេ។`,
        },
        {
          type: 'def',
          term: `"លេខទូរស័ព្ទទាន់ហេតុការណ៍ (Hotline)"`,
          text: `សំដៅលើ លេខទូរស័ព្ទសេវាអតិថិជន 0978 119 119 ឬលេខជំនួសផ្សេងទៀតដែលជូនដំណឹងដោយក្រុមហ៊ុន។`,
        },
        {
          type: 'def',
          term: `"កំណត់ត្រាវេជ្ជសាស្ត្រ"`,
          text: `សំដៅលើ ទិន្នន័យផ្ទាល់ខ្លួនពាក់ព័ន្ធនឹងសុខភាពរបស់អតិថិជន រួមមានជាអាទិ៍៖ ប្រវត្តិវេជ្ជសាស្ត្រ លទ្ធផលនៃការពិនិត្យ ការធ្វើរោគវិនិច្ឆ័យ វេជ្ជបញ្ជា ឯកសាររូបភាពវេជ្ជសាស្ត្រ លទ្ធផលធ្វើតេស្តមន្ទីរពិសោធន៍ និងព័ត៌មានគ្លីនិកផ្សេងទៀតដែលបានបង្កើតឡើង ប្រមូល ឬរក្សាទុកដោយមន្ទីរពេទ្យជាដៃគូ ពាក់ព័ន្ធនឹងការថែទាំអតិថិជន។`,
        },
        {
          type: 'def',
          term: `"មន្ទីរពេទ្យជាដៃគូ"`,
          text: `សំដៅលើ មន្ទីរពេទ្យ គ្លីនិក ឬមូលដ្ឋានសុខាភិបាលណាមួយ ដែលមានទីតាំងនៅប្រទេសកម្ពុជា ឬវៀតណាម ដែលបានចុះកិច្ចព្រមព្រៀងសហប្រតិបត្តិការជាលាយលក្ខណ៍អក្សរជាមួយក្រុមហ៊ុន ក្នុងគោលបំណងបញ្ជូនអតិថិជន និង/ឬទទួលអតិថិជន ដែលត្រូវបានណែនាំមក។`,
        },
        {
          type: 'def',
          term: `"ទិន្នន័យផ្ទាល់ខ្លួន"`,
          text: `សំដៅលើ ព័ត៌មានមូលដ្ឋាន និងកំណត់ត្រាវេជ្ជសាស្ត្រ (ប្រសិនបើមាន)។`,
        },
        {
          type: 'def',
          term: `"សេវាកម្ម" / "សេវា MetHealth"`,
          text: `សំដៅលើ សេវាកម្មមួយចំនួន ឬទាំងអស់ដែលមានរៀបរាប់ក្នុងប្រការ ៣ នៃ ខ និង លក្ខខណ្ឌនេះ។`,
        },
        {
          type: 'def',
          term: `"កម្រៃសេវា"`,
          text: `សំដៅលើ ថ្លៃសេវាដែលអតិថិជនត្រូវបង់ជូនក្រុមហ៊ុនសម្រាប់សេវាកម្ម ដូចដែលបានចែងនៅពេលធ្វើការកក់។`,
        },
        {
          type: 'def',
          term: `"អ្នកផ្តល់សេវាភាគីទីបី"`,
          text: `សំដៅលើ ភាគីទីបីឯករាជ្យដែលត្រូវបានជួលតាមរយៈក្រុមហ៊ុនឱ្យផ្តល់ជូនអតិថិជន នូវសេវាបកប្រែ សេវាដឹកជញ្ជូន សេវាស្នាក់នៅ និងសេវាពាក់ព័ន្ធផ្សេងទៀត ពាក់ព័ន្ធនឹងការពិនិត្យ ព្យាបាល និងការថែទាំអតិថិជនជាមួយនឹងមន្ទីរពេទ្យជាដៃគូ។`,
        },
        {
          type: 'def',
          term: `"ថ្ងៃធ្វើការ"`,
          text: `សំដៅលើ ថ្ងៃ (ក្រៅពីថ្ងៃសៅរ៍ ថ្ងៃអាទិត្យ ឬថ្ងៃឈប់សម្រាកបុណ្យជាតិនៅប្រទេសកម្ពុជា) ដែលធនាគារពាណិជ្ជបើកដំណើរការអាជីវកម្មជាទូទៅនៅកម្ពុជា។`,
        },
        {
          type: 'para',
          text: `ចំណងជើងនៃផ្នែកនីមួយៗ ត្រូវបានដាក់ក្នុងគោលបំណងដើម្បីបង្កលក្ខណៈងាយស្រួលប៉ុណ្ណោះ និងមិនប៉ះពាល់ដល់ការបកស្រាយខ្លឹមសារនៃ ខ លក្ខខណ្ឌនេះឡើយ។ ពាក្យដែលប្រើក្នុងទម្រង់ឯកវចនៈ ត្រូវរាប់បញ្ចូលទាំងពហុវចនៈ និងក្នុងន័យផ្ទុយមកវិញ។ ការយោងទៅលើច្បាប់ ត្រូវរាប់បញ្ចូលទាំងការធ្វើវិសោធនកម្ម និងការដាក់ឱ្យប្រើប្រាស់ឡើងវិញនៃច្បាប់ជាធរមាន។`,
        },
      ],
    },
    {
      num: '២',
      title: 'ការអនុវត្ត និងការយល់ព្រម',
      blocks: [
        {
          type: 'para',
          text: `ខ និង លក្ខខណ្ឌទាំងនេះត្រូវអនុវត្តចំពោះរាល់សេវាកម្មដែលផ្តល់ដោយក្រុមហ៊ុនជូនដល់អតិថិជន។ តាមរយៈការប្រើប្រាស់ ការកក់ ឬការទទួលសេវាកម្ម អតិថិជនទទួលស្គាល់ថា ខ្លួនបានអាន យល់ច្បាស់ និងយល់ព្រមអនុវត្តតាមកាតព្វកិច្ចដែលមានចែងក្នុងខ និងលក្ខខណ្ឌនេះ។`,
        },
      ],
    },
    {
      num: '៣',
      title: 'វិសាលភាពនៃសេវាកម្ម',
      blocks: [
        {
          type: 'item',
          label: '៣.១',
          text: `សេវាកម្មមានរួមបញ្ចូលនូវសេវាគាំទ្រដែលមិនមែនជាផ្នែកវេជ្ជសាស្ត្រ ដូចខាងក្រោម៖`,
        },
        {
          type: 'item',
          label: '(ក)',
          text: `សេវាភ្ជាប់ទំនាក់ទំនងជាមួយមន្ទីរពេទ្យ៖ ការណែនាំ និង/ឬការសម្របសម្រួលដោយក្រុមហ៊ុនក្នុងការបញ្ជូនអតិថិជនទៅកាន់មន្ទីរពេទ្យជាដៃគូក្នុងប្រទេសកម្ពុជា និងប្រទេសវៀតណាម និងការសម្របសម្រួលការកក់ណាត់ជួបផ្នែកវេជ្ជសាស្រ្តដោយអតិថិជនផ្ទាល់ តាមរយៈកម្មវិធី និង/ឬ Hotline ដោយផ្តល់ការណែនាំផ្នែករដ្ឋបាលអំពីដំណើរការជាមូលដ្ឋានក្នុងការកក់ជាមួយនឹងមន្ទីរពេទ្យជាដៃគូ និងព័ត៌មានផ្សេងទៀតដែលមិនពាក់ព័ន្ធនឹងជំងឺ ឬមិនពាក់ព័ន្ធនឹងសុខភាព។`,
        },
        {
          type: 'item',
          label: '(ខ)',
          text: `សេវាបកប្រែ៖ សេវាបកប្រែភាសាវៀតណាម-ខ្មែរ ដែលផ្តល់ជូនអតិថិជនពាក់ព័ន្ធនឹងការពិនិត្យ ព្យាបាល និងថែទាំ ("ការថែទាំវេជ្ជសាស្ត្រ") និងនីតិវិធីរដ្ឋបាលនៅមន្ទីរពេទ្យជាដៃគូ។`,
        },
        {
          type: 'item',
          label: '(គ)',
          text: `សេវាដឹកជញ្ជូន៖ ការរៀបចំមធ្យោបាយធ្វើដំណើរតាមផ្លូវគោករវាងប្រទេសកម្ពុជា និងប្រទេសវៀតណាម និងនៅក្នុងប្រទេសវៀតណាម សម្រាប់អតិថិជនដែលធ្វើដំណើរទៅប្រទេសវៀតណាម ដើម្បីទទួលការថែទាំវេជ្ជសាស្ត្រពីមន្ទីរពេទ្យជាដៃគូនៅក្នុងប្រទេសវៀតណាម។`,
        },
        {
          type: 'item',
          label: '(ឃ)',
          text: `សេវាស្នាក់នៅ៖ ការរៀបចំកន្លែងស្នាក់នៅក្នុងប្រទេសវៀតណាមសម្រាប់អតិថិជន ដែលធ្វើដំណើរទៅកាន់ប្រទេសវៀតណាម ដើម្បីទទួលការថែទាំវេជ្ជសាស្ត្រពីមន្ទីរពេទ្យជាដៃគូ ក្នុងប្រទេសវៀតណាម។`,
        },
        {
          type: 'item',
          label: '៣.២',
          text: `សេវាកម្មត្រូវបានផ្តល់តាមរយៈកម្មវិធីរបស់ក្រុមហ៊ុន និង/ឬ Hotline។ ក្រុមហ៊ុនអាចបន្ថែម កែប្រែ ឬបញ្ឈប់សេវាកម្មណាមួយនៅពេលណាក៏បាន ដោយការជូនដំណឹងជាមុនជាទូទៅ ដល់អតិថិជនតាមរយៈកម្មវិធី ឬបណ្តាញសង្គមផ្សេងទៀត ក្នុងលក្ខខណ្ឌថាការផ្លាស់ប្តូរនោះមិនប៉ះពាល់ដល់ការកក់ដែលបានបញ្ជាក់រួច រាល់មុនពេលការផ្លាស់ប្តូរមានប្រសិទ្ធភាព។`,
        },
        {
          type: 'para',
          text: `ក្រុមហ៊ុនគ្រាន់តែផ្តល់នូវវេទិកា ដើម្បីសម្របសម្រួលការភ្ជាប់ទំនាក់ទំនងរវាងអតិថិជន មន្ទីរពេទ្យជាដៃគូ និងអ្នកផ្តល់សេវាជាភាគីទីបី តាមរយៈកម្មវិធី និង Hotline តែប៉ុណ្ណោះ។ ក្រុមហ៊ុនមិនមែនជាបន្ទប់ពិគ្រោះជំងឺ មន្ទីរពេទ្យ គ្លីនិក មូលដ្ឋានសុខាភិបាល អ្នកជំនាញថែទាំសុខភាព ក្រុមហ៊ុនធានារ៉ាប់រង ឬកន្លែងសុខាភិបាលឡើយ ហើយមិនទទួលខុសត្រូវផ្នែកវេជ្ជសាស្ត្រ គ្លីនិក ឬការទទួលខុសត្រូវពាក់ព័ន្ធនឹងការព្យាបាលឬការទទួលខុសត្រូវពាក់ព័ន្ធនឹងសេវាកម្មណាមួយដែលផ្តល់ដោយមន្ទីរពេទ្យជាដៃគូនោះទេ។ រាល់ព័ត៌មានដែលផ្តល់តាមរយៈកម្មវិធី ឬ Hotline គឺសម្រាប់តែគោលបំណងរដ្ឋបាល និងការសម្របសម្រួលប៉ុណ្ណោះ និងមិនត្រូវបកស្រាយថាជាការផ្តល់ប្រឹក្សាផ្នែកវេជ្ជសាស្ត្រ ការធ្វើរោគវិនិច្ឆ័យ ការព្យាបាល និង/ឬការពិគ្រោះជំងឺឡើយ។`,
        },
      ],
    },
    {
      num: '៤',
      title: 'កាតព្វកិច្ចរបស់អតិថិជន',
      blocks: [
        { type: 'para', text: `អតិថិជនធានា និងអះអាងថា៖` },
        {
          type: 'item',
          label: '៤.១',
          text: `ផ្តល់ព័ត៌មានដែលមានសុពលភាព ពេញលេញ ពិតប្រាកដ ត្រឹមត្រូវ និងបច្ចុប្បន្នភាព រួមមាន តែមិនកំណត់ចំពោះ៖ (ក) ព័ត៌មានមូលដ្ឋាន (ខ) ប្រវត្តិ/កំណត់ត្រាវេជ្ជសាស្ត្រ (គ) ព័ត៌មានលទ្ធភាពហិរញ្ញវត្ថុដែលត្រូវចំណាយលើសេវាសុខភាព និង (ឃ) ព័ត៌មានចាំបាច់ផ្សេងទៀត នៅពេលធ្វើការកក់តាមរយៈការចុះឈ្មោះក្នុងកម្មវិធី ឬ Hotline។`,
        },
        {
          type: 'item',
          label: '៤.២',
          text: `ប្រើប្រាស់សេវាកម្មសម្រាប់តែគោលបំណងស្របច្បាប់ និងផ្ទាល់ខ្លួនប៉ុណ្ណោះ និងមិនប្រើប្រាស់ក្នុងគោលបំណងពាណិជ្ជកម្ម ភាពខុសច្បាប់ ការបំពាន ឬការបោកប្រាស់ ក្លែងបន្លំណាមួយឡើយ។`,
        },
        {
          type: 'item',
          label: '៤.៣',
          text: `អនុលោមតាមវិធានស្ដីពីការកក់ និងវិធានពាក់ព័ន្ធរបស់មន្ទីរពេទ្យជាដៃគូនីមួយៗ និងរាល់ការណែនាំសមស្របដែលចេញដោយក្រុមហ៊ុន ឬមន្ទីរពេទ្យជាដៃគូពាក់ព័ន្ធនឹងសេវាកម្ម។`,
        },
        {
          type: 'item',
          label: '៤.៤',
          text: `បង់រាល់កម្រៃសេវា និងចំនួនទឹកប្រាក់ផ្សេងទៀតដែលនៅសល់ជូនក្រុមហ៊ុនឱ្យបានទាន់ពេលវេលា និងស្របតាមប្រការ ៥ និងបង់ប្រាក់ដោយផ្ទាល់ទៅមន្ទីរពេទ្យជាដៃគូសម្រាប់រាល់ការថែទាំវេជ្ជសាស្ត្រ និង/ឬសេវាវេជ្ជសាស្ត្រដែលទទួលបានស្របតាមប្រការ ៧។`,
        },
        {
          type: 'item',
          label: '៤.៥',
          text: `ចូលរួមរាល់ការណាត់ជួបដែលបានបញ្ជាក់រួច ឱ្យទាន់ពេលវេលា និងលុបចោល ឬប្តូរកាលបរិច្ឆេទណាត់ជួប ក្នុងករណីដែលស្របតាមប្រការ ៦ តែប៉ុណ្ណោះ។`,
        },
        {
          type: 'item',
          label: '៤.៦',
          text: `រៀបចំ និងរក្សាលិខិតឆ្លងដែនអោយមានសុពលភាព និងទិដ្ឋាការ ឬឯកសារចូលប្រទេសផ្សេងទៀតដែលតម្រូវសម្រាប់ការឆ្លងដែនរវាងប្រទេសកម្ពុជា និងប្រទេសវៀតណាម និងអនុលោមតាមច្បាប់ និងបទប្បញ្ញត្តិទាំងឡាយរបស់ប្រទេសវៀតណាម និងប្រទេសកម្ពុជា ដែលមានជាធរមាន រួមមាន តែមិនកំណត់ចំពោះ៖ តម្រូវការអន្តោប្រវេសន៍ គយ និងសុខភាពសាធារណៈ។`,
        },
        {
          type: 'item',
          label: '៤.៧',
          text: `ត្រូវគោរពផ្តល់តម្លៃចំពោះបុគ្គលិករបស់ក្រុមហ៊ុន បុគ្គលិករបស់មន្ទីរពេទ្យជាដៃគូ អ្នកបើកបរ អ្នកបកប្រែ និងអ្នកផ្តល់សេវាផ្សេងទៀត និង ជៀសវាងរាល់អាកប្បកិរិយាដែលអាចបង្កគ្រោះថ្នាក់ដល់សុខភាព សុវត្ថិភាព សុខុមាលភាព ឬសេចក្តីថ្លៃថ្នូររបស់អ្នកដទៃ។`,
        },
        {
          type: 'item',
          label: '៤.៨',
          text: `រក្សាព័ត៌មានសម្ងាត់សម្រាប់ចូលប្រើប្រាស់កម្មវិធីឱ្យបានតឹងរ៉ឹងបំផុត និងជូនដំណឹងដល់ក្រុមហ៊ុនជាបន្ទាន់អំពីការប្រើប្រាស់ និងការចូលប្រើប្រាស់គណនីរបស់អតិថិជន ដោយគ្មានការអនុញ្ញាត។`,
        },
        {
          type: 'item',
          label: '៤.៩',
          text: `មិនចម្លង ធ្វើវិស្វកម្មបញ្ច្រាស (Reverse-engineer) បំបែកកូដ (Decompile) កែប្រែ ឬរំខានដល់កម្មវិធី ប្រព័ន្ធ Hotline ឬ វេទិកាណាមួយរបស់ក្រុមហ៊ុន។ និង`,
        },
        {
          type: 'item',
          label: '៤.១០',
          text: `ក្នុងករណីអតិថិជនកក់ ឬប្រើប្រាស់សេវាកម្មជំនួសឱ្យបុគ្គលម្នាក់ទៀត អតិថិជនត្រូវតំណាង និងធានាថាបុគ្គលនោះត្រូវបានផ្តល់ព័ត៌មានពេញលេញ និងយល់ព្រមតាមខ និងលក្ខខណ្ឌនេះ ហើយអតិថិជនមានសិទ្ធិពេញលេញក្នុងការធ្វើសកម្មភាពជំនួស និងចងភ្ជាប់កាតព្វកិច្ចរបស់បុគ្គលនោះ ជាមួយនឹងសេវាកម្ម។`,
        },
      ],
    },
    {
      num: '៥',
      title: 'ការកក់ កម្រៃសេវា និងការទូទាត់',
      blocks: [
        {
          type: 'item',
          label: '៥.១',
          text: `ការកក់ប្រាក់៖ ការកក់ត្រូវបានបញ្ជាក់ថាជោគជ័យ លុះត្រាតែ (i) អតិថិជនបានទទួលយក ខ និងលក្ខខណ្ឌនេះ (ii) អតិថិជនបានបង់កម្រៃសេវាទាំងអស់ដែលពាក់ព័ន្ធទៅនឹងការកក់បានពេញលេញ និង (iii) ក្រុមហ៊ុនបានចេញការបញ្ជាក់តាមរយៈកម្មវិធី Hotline ឬ តេឡេក្រាម (Telegram) (ប្រសិនបើមាន)។`,
        },
        {
          type: 'item',
          label: '៥.២',
          text: `កម្រៃសេវាថែទាំវេជ្ជសាស្ត្រជូនដល់មន្ទីរពេទ្យជាដៃគូ៖ ថ្លៃសេវាថែទាំវេជ្ជសាស្ត្រត្រូវបានកំណត់ និងគិតថ្លៃដោយមន្ទីរពេទ្យជាដៃគូតែប៉ុណ្ណោះ។ អតិថិជនត្រូវបង់ថ្លៃសេវាទាំងនោះដោយផ្ទាល់ទៅឱ្យមន្ទីរពេទ្យជាដៃគូ ស្របតាមគោលការណ៍ និងតម្រូវការរបស់មន្ទីរពេទ្យជាដៃគូ។ អតិថិជនទទួលស្គាល់ថា ក្រុមហ៊ុនមិនមែនជាភាគី ហើយក៏មិនទទួលខុសត្រូវចំពោះការទូទាត់ណាមួយដែលធ្វើឡើងដោយអតិថិជនទៅកាន់មន្ទីរពេទ្យ ជាដៃគូសម្រាប់ សេវាវេជ្ជសាស្ត្រ និងសេវាពាក់ព័ន្ធឡើយ ហើយក្រុមហ៊ុនមិនទទួលបានចំណែកណាមួយនៃថ្លៃសេវាទាំងនោះពីអតិថិជនឡើយ។`,
        },
        {
          type: 'item',
          label: '៥.៣',
          text: `កម្រៃសេវាដែលត្រូវបង់ជូនក្រុមហ៊ុន៖`,
        },
        {
          type: 'para',
          text: `អតិថិជនត្រូវបង់ប្រាក់ឱ្យក្រុមហ៊ុនដោយផ្ទាល់សម្រាប់សេវាកម្ម ដែលអាចមានសេវាមួយ ឬ ច្រើន យោងតាមសំណើរបស់អតិថិជន និងការប្រើប្រាស់ជាក់ស្ដែងដូចជា៖ (i) សេវាបកប្រែភាសាវៀតណាម-ភាសាខ្មែរ (ii) សេវាចំពោះមធ្យោបាយធ្វើដំណើរ និង (iii) សេវារៀបចំការស្នាក់នៅ ស្របតាមតម្លៃដែលបានចែងនៅពេលកក់។ កម្រៃសេវាទាំងអស់ត្រូវបង់ជាដុល្លារអាមេរិក (USD)។ ការទូទាត់ត្រូវធ្វើឡើងតាមរយៈមធ្យោបាយទូទាត់ដែលមាននៅក្នុងកម្មវិធី។ ប្រសិនបើមានមធ្យោបាយទូទាត់បន្ថែម ក្រុមហ៊ុននឹងជូនដំណឹងដល់អតិថិជនតាមរយៈ Hotline ផ្លូវការរបស់ក្រុមហ៊ុន ឬបណ្តាញ ទំនាក់ទំនងផ្លូវការផ្សេងទៀត ដែលក្រុមហ៊ុនអាចកំណត់ពីពេលមួយទៅពេលមួយ។`,
        },
        {
          type: 'para',
          text: `អតិថិជនទទួលស្គាល់ និងយល់ព្រមថា កម្រៃសេវាដែលបានចែងគ្របដណ្តប់តែលើសេវាកម្មជាក់លាក់ដែលបានបញ្ជាក់នៅពេលកក់ប៉ុណ្ណោះ។ អតិថិជនត្រូវទទួលខុសត្រូវដោយខ្លួនឯង និងត្រូវបង់ដោយផ្ទាល់ទៅអ្នកផ្តល់សេវាពាក់ព័ន្ធ សម្រាប់រាល់ការចំណាយបន្ថែមផ្ទាល់ខ្លួន ដោយចៃដន្យ ដោយជម្រើស ឬការគិតថ្លៃបន្ថែម ដែលកើតឡើងក្នុងអំឡុងពេលប្រើប្រាស់សេវាកម្ម រួមមានតែមិនកំណត់ចំពោះ៖ ការប្រើប្រាស់មីនីបារ (Minibar) សេវាបោកអ៊ុត ថ្លៃទូរស័ព្ទ សេវាកម្មក្នុងបន្ទប់ ចំណីអាហារ និងភេសជ្ជៈ ថ្លៃចំណតយានជំនិៈ ថ្លៃផ្លូវ ថ្លៃអីវ៉ាន់លើសទម្ងន់ សំណើសុំលើសម៉ោង ប្រាក់លើកទឹកចិត្ត ការខូចខាត ការពិន័យ ឬទំនិញ ឬ សេវាកម្មផ្សេងទៀត ដែលមិនមានបញ្ចូលក្នុងការកក់ដែលបានបញ្ជាក់។ ក្រុមហ៊ុនមិនទទួលខុសត្រូវ ចំពោះរាល់ការចំណាយបន្ថែមទាំងនេះឡើយ និងពុំមានកាតព្វកិច្ចក្នុងការទូទាត់ឱ្យជាមុន ទូទាត់សង ឬដោះស្រាយចំនួនទឹកប្រាក់ដែលអតិថិជនបានជំពាក់ ចំពោះអ្នកផ្ដល់សេវាភាគីទីបីណាមួយឡើយ។`,
        },
        {
          type: 'para',
          text: `អតិថិជនទទួលស្គាល់ និងយល់ព្រមថា ក្រុមហ៊ុនមិនទទួលខុសត្រូវចំពោះការបាត់បង់ ការខូចខាត ការក្លែងបន្លំ ឬប្រតិបត្តិការដែលគ្មានការអនុញ្ញាតដែលកើតចេញពីការប្រាស្រ័យទាក់ទង ការណែនាំអំពីការទូទាត់ ឬសំណើដែលទទួលបានពីបុគ្គលណាម្នាក់ លេខទូរស័ព្ទ ឬបណ្តាញណាមួយដែលមិនមានការអនុញ្ញាតជាផ្លូវការពីក្រុមហ៊ុនឡើយ។`,
        },
        {
          type: 'item',
          label: '៥.៤',
          text: `ពន្ធ៖ រាល់កម្រៃសេវាដែលត្រូវបង់ជូនក្រុមហ៊ុន គឺរួមបញ្ចូលនូវរាល់ពន្ធដែលអាចអនុវត្តបាន រួមទាំងអាករលើតម្លៃបន្ថែមតាមអាត្រាដែលកំណត់ដោយច្បាប់ជាធរមាន លើកលែងតែមានចែងខុសពីនេះ។`,
        },
      ],
    },
    {
      num: '៦',
      title: 'ការលុបចោល ការប្តូរកាលបរិច្ឆេទ និងការបង្វិលសងប្រាក់',
      blocks: [
        {
          type: 'item',
          label: '៦.១',
          text: `ការលុបចោល ឬការប្តូរកាលបរិច្ឆេទនៃការណាត់ជួបផ្នែកវេជ្ជសាស្រ្ត ត្រូវគ្រប់គ្រងដោយគោលការណ៍របស់មន្ទីរពេទ្យជាដៃគូពាក់ព័ន្ធ។ អតិថិជនត្រូវអនុលោមតាមគោលការណ៍ទាំងនោះ ហើយរាល់ថ្លៃលុបចោលដែលកំណត់ដោយមន្ទីរពេទ្យជាដៃគូ ត្រូវបង់ដោយផ្ទាល់ និងធ្វើឡើងដោយអតិថិជនខ្លួនឯង ទៅកាន់មន្ទីរពេទ្យជាដៃគូ។ ក្រុមហ៊ុននឹងមិនទទួលខុសត្រូវចំពោះលទ្ធភាពនៃការបង្វិលសងប្រាក់ ការសម្រេចចិត្ត ការខាតបង់ផ្នែកហិរញ្ញវត្ថុ ឬថ្លៃសេវាដែលមិនទាន់បានបង់ ដែលកើតឡើងពីការលុបចោល/សកម្មភាពរបស់អតិថិជន ឬការលុបចោល/សកម្មភាពរបស់មន្ទីរពេទ្យដៃគូឡើយ។`,
        },
        {
          type: 'item',
          label: '៦.២',
          text: `អតិថិជនអាចលុបចោល ឬកំណត់កាលបរិច្ឆេទឡើងវិញនូវសេវាបកប្រែ សេវាដឹកជញ្ជូន សេវាស្នាក់នៅ ឬសេវាបញ្ចូលគ្នាណាមួយដែលបានកក់ទុកតាមរយៈ App។ ក្នុងករណីនេះ អតិថិជននឹងមានសិទ្ធិទទួលបានការបង្វិលសងនូវកម្រៃសេវាវិញ ស្របតាមកាលវិភាគបង្វិលសង ដែលបានកំណត់នៅក្នុង "គោលការណ៍" ដែលបានផ្តល់ជូនតាមរយៈកម្មវិធី នៅពេលជ្រើសរើសសេវាកម្មទាំងនោះ។ ដើម្បីជៀសវាងការយល់ច្រឡំ ប្រការនេះអនុវត្តចំពោះសេវានានាដែលត្រូវបានកក់ជាលក្ខណៈបុគ្គល ឬ រួមគ្នា ដែលជាផ្នែកនៃការកក់តែមួយ។`,
        },
        { type: 'item', label: '៦.៣', text: `ការលុបចោលដោយក្រុមហ៊ុន៖` },
        {
          type: 'para',
          text: `ក្រុមហ៊ុនរក្សាសិទ្ធិក្នុងការលុបចោលការកក់ និងអាចលុបចោលការកក់ដែលបានបញ្ជាក់រួច ដោយមិនមានការបង្វិលសងកម្រៃសេវាដែលអតិថិជនបានបង់ ក្នុងករណីដូចខាងក្រោម៖`,
        },
        {
          type: 'item',
          label: '(ក)',
          text: `ការបំពានរបស់អតិថិជន៖ អតិថិជនបំពានយ៉ាងធ្ងន់ធ្ងរទៅលើខ និងលក្ខខណ្ឌនេះ រួមបញ្ចូលទាំងដោយគ្មានដែនកំណត់ចំពោះ៖ (ក) ការផ្តល់ព័ត៌មានមិនពិត គ្មានសុពលភាព មិនពេញលេញ ឬព័ត៌មានបំភាន់នៅពេលចុះឈ្មោះ ឬកក់។ (ខ) ការរំលោភបំពាន ការគំរាមកំហែង អំពើហឹង្សា ឬការប្រព្រឹត្តដែលបង្កគ្រោះថ្នាក់ដល់បុគ្គលិករបស់ក្រុមហ៊ុន បុគ្គលិករបស់មន្ទីរពេទ្យជាដៃគូ អ្នកបកប្រែ អ្នកបើកបរ ឬបុគ្គលផ្សេងទៀតដែលបានចូលរួម ពាក់ព័ន្ធនឹងសេវាកម្ម។ និង (គ) ការប្រើប្រាស់សេវាកម្មសម្រាប់គោលបំណងខុសច្បាប់ណាមួយ។`,
        },
        {
          type: 'item',
          label: '(ខ)',
          text: `ការក្លែងបន្លំ៖ អតិថិជនទទួលបាន ឬក្រុមហ៊ុនសង្ស័យក្រោមហេតុផលសមស្របថា អតិថិជនបានទទួល សេវាកម្ម ឬការកក់ណាមួយតាមរយ:/ដោយការឆបោក ការក្លែងបន្លំ ការប្រើប្រាស់អត្តសញ្ញាណខុស ឬមធ្យោបាយមិនសុចរិតផ្សេងទៀត។`,
        },
        {
          type: 'item',
          label: '(គ)',
          text: `ការបោះបង់ការយល់ព្រម៖ អតិថិជនបោះបង់ការយល់ព្រម សម្រាប់ដំណើរការព័ត៌មានមូលដ្ឋានដែលតម្រូវសម្រាប់ការផ្តល់សេវាកម្ម ដែលស្ថិតក្រោមប្រការ ៩ ហើយការបោះបង់បែបនេះធ្វើឱ្យក្រុមហ៊ុនមិនអាចបន្តផ្តល់សេវា ឬរក្សាការកក់ទុកបានទេ។ ឬ`,
        },
        {
          type: 'item',
          label: '(ឃ)',
          text: `ការបដិសេធឱ្យចូល ឬចាកចេញដោយអាជ្ញាធរ៖ អាជ្ញាធរមានសមត្ថកិច្ចណាមួយនៃប្រទេសកម្ពុជា ឬប្រទេសវៀតណាមបដិសេធការចូល ឬការចាកចេញរបស់អតិថិជនពីប្រទេសណាមួយ។`,
        },
      ],
    },
    {
      num: '៧',
      title: 'សេវាវេជ្ជសាស្ត្រដែលផ្តល់ដោយមន្ទីរពេទ្យជាដៃគូ',
      blocks: [
        {
          type: 'item',
          label: '៧.១',
          text: `រាល់សេវាវេជ្ជសាស្ត្រដែលអតិថិជនទទួលបាន គឺត្រូវបានផ្តល់ដោយផ្ទាល់ដោយមន្ទីរពេទ្យជាដៃគូពាក់ព័ន្ធ ក្រោមទំនាក់ទំនងកិច្ចសន្យាដាច់ដោយឡែករវាងអតិថិជន និងមន្ទីរពេទ្យជាដៃគូនោះ។ ទំនាក់ទំនងបែបនេះត្រូវបានគ្រប់គ្រងដោយគោលការណ៍ លក្ខខណ្ឌ ទម្រង់ការយល់ព្រមរបស់មន្ទីរពេទ្យជាដៃគូ និងច្បាប់នៃប្រទេសដែលសេវាកម្មត្រូវបានផ្តល់ជូន។ អតិថិជនទទួលស្គាល់ថា ក្រុមហ៊ុនមិនមែនជាភាគីនៃទំនាក់ទំនងនេះឡើយ។`,
        },
        {
          type: 'item',
          label: '៧.២',
          text: `ក្រុមហ៊ុនមិនមានការគ្រប់គ្រង និងមិនទទួលខុសត្រូវចំពោះសេវាវេជ្ជសាស្ត្រណាមួយដែលផ្តល់ដោយមន្ទីរពេទ្យជាដៃគូឡើយ រួមទាំងគុណភាពនៃការថែទាំ ការធ្វើរោគវិនិច្ឆ័យ ការព្យាបាល ថ្នាំ លទ្ធផលវេជ្ជសាស្ត្រ ឬថ្លៃសេវាដែលបានគិត។ ក្នុងកម្រិតអតិបរមាដែលអនុញ្ញាតដោយច្បាប់ជាធរមាន ក្រុមហ៊ុននឹងមិនទទួលខុសត្រូវចំពោះទង្វើ ការខកខាន ការធ្វេសប្រហែស ឬការប្រព្រឹត្តមិនត្រឹមត្រូវរបស់មន្ទីរពេទ្យជាដៃគូ វេជ្ជបណ្ឌិត ឬបុគ្គលិកពេទ្យណាមួយឡើយ។`,
        },
        {
          type: 'item',
          label: '៧.៣',
          text: `អតិថិជនត្រូវទទួលខុសត្រូវដោយខ្លួនឯង ក្នុងការវាយតម្លៃភាពសមស្របរបស់មន្ទីរពេទ្យជាដៃគូ មុនពេលបញ្ជាក់នូវការកក់។ ក្រុមហ៊ុនមិនធ្វើការតំណាង ឬការធានា បង្ហាញ ឬបញ្ឆិតបញ្ឆៀងអំពីគុណវុឌ្ឍិរបស់បុគ្គលិកពេទ្យ សុវត្ថិភាព ឬលទ្ធផលនៃការព្យាបាលណាមួយ ឬភាពត្រឹមត្រូវនៃព័ត៌មានទាក់ទងនឹងមន្ទីរពេទ្យជាដៃគូដែលបង្ហាញនៅលើកម្មវិធី។`,
        },
        {
          type: 'item',
          label: '៧.៤',
          text: `អតិថិជនត្រូវទទួលបាន និងរក្សាការធានារ៉ាប់រងសុខភាព ការធានារ៉ាប់រងការធ្វើដំណើរ ឬការធានារ៉ាប់រងផ្សេងទៀតតាមការសម្រេចចិត្តរបស់ខ្លួន និងតាមតម្រូវការដោយច្បាប់ដែលមានជាធរមាន (ប្រសិនបើមាន)។ ក្រុមហ៊ុនមិនផ្តល់ការធានារ៉ាប់រង ហើយនឹងមិនទទួលខុសត្រូវចំពោះថ្លៃព្យាបាល ការសម្រាកព្យាបាលនៅមន្ទីរពេទ្យ ការធ្វើមាតុភូមិនិវត្តន៍ ឬការចំណាយពាក់ព័ន្ធផ្សេងទៀតដែលកើតឡើងដោយអតិថិជននោះទេ។`,
        },
        {
          type: 'item',
          label: '៧.៥',
          text: `រាល់បណ្ដឹង ការទាមទារ ឬវិវាទទាក់ទងនឹងសេវាវេជ្ជសាស្រ្ត នឹងត្រូវដោះស្រាយដោយផ្ទាល់ដោយអតិថិជនជាមួយនឹងមន្ទីរពេទ្យជាដៃគូពាក់ព័ន្ធ។ ក្រុមហ៊ុនមិនមានការទទួលខុសត្រូវអ្វីទាំងអស់ទាក់ទងនឹងបញ្ហាទាំងនោះ។`,
        },
      ],
    },
    {
      num: '៨',
      title: 'សេវាដឹកជញ្ជូន ស្នាក់នៅ និងបកប្រែ',
      blocks: [
        {
          type: 'item',
          label: '៨.១',
          text: `នៅពេលដែលអតិថិជនកក់ការដឹកជញ្ជូន ការស្នាក់នៅ ឬសេវាបកប្រែទាក់ទងនឹងការធ្វើដំណើរទៅកាន់មន្ទីរពេទ្យជាដៃគូនៅក្នុងប្រទេសវៀតណាម សេវាកម្មទាំងនោះត្រូវផ្តល់ដោយអ្នកផ្តល់សេវាភាគីទីបីដែលបានចុះកិច្ចសន្យាជាមួយក្រុមហ៊ុន។ ក្រុមហ៊ុនត្រូវខិតខំប្រឹងប្រែងទៅតាមលទ្ធភាពសមស្រប ដើម្បីទទួលបានការអនុវត្តសេវាកម្មនេះឱ្យបានត្រឹមត្រូវ ស្របតាមការបញ្ជាក់អំពីការកក់។`,
        },
        {
          type: 'item',
          label: '៨.២',
          text: `ទំនួលខុសត្រូវរបស់ក្រុមហ៊ុនចំពោះការបាត់បង់ ឬការខូចខាតដែលទាក់ទងនឹងការដឹកជញ្ជូន ការស្នាក់នៅ ឬ សេវាកម្មបកប្រែដែលបណ្តាលមកពីកំហុសរបស់ក្រុមហ៊ុន មិនត្រូវលើសពីថ្លៃសេវាដែលអតិថិជនបានបង់សម្រាប់សេវាកម្មជាក់លាក់នោះទេ។`,
        },
      ],
    },
    {
      id: PRIVACY_SECTION_ID,
      num: '៩',
      title: 'ការការពារទិន្នន័យផ្ទាល់ខ្លួន និងឯកជនភាព',
      blocks: [
        {
          type: 'item',
          label: '៩.១',
          text: `អតិថិជនទទួលស្គាល់ និងយល់ព្រមចំពោះការប្រមូល ការប្រើប្រាស់ ការរក្សាទុក និងការដំណើរការទិន្នន័យផ្ទាល់ខ្លួនរបស់អតិថិជនដោយក្រុមហ៊ុន ក្នុងគោលបំណងផ្តល់សេវាកម្មស្របតាមច្បាប់ជាធរមាន។ អតិថិជនត្រូវផ្ដល់សំណង និងការពារក្រុមហ៊ុនឱ្យរួចផុតពីការខាតបង់ ការខូចខាត ការចំណាយ ឬការទទួលខុសត្រូវណាមួយដែលកើតចេញពីការរំលោភលើការធានារបស់អតិថិជនដែលមានចែងក្នុងប្រការនេះ។`,
        },
        {
          type: 'item',
          label: '៩.២',
          text: `ការយល់ព្រមលើការដំណើរការទិន្នន័យផ្ទាល់ខ្លួន៖ តាមរយៈការទទួលយក ខនិង លក្ខខណ្ឌនេះ អតិថិជនយល់ព្រមឱ្យក្រុមហ៊ុនប្រមូល ប្រើប្រាស់ រក្សាទុក និងដំណើរការព័ត៌មានមូលដ្ឋានរបស់អតិថិជន សម្រាប់គោលបំណងដែលមានចែងក្នុងប្រការ ៩.៣ ខាងក្រោម។`,
        },
        {
          type: 'para',
          text: `ការផ្តល់កំណត់ត្រាវេជ្ជសាស្ត្រដោយអតិថិជនគឺស្ម័គ្រចិត្ត។ អតិថិជនអាចជ្រើសរើសថា តើត្រូវផ្តល់ ឬមិនត្រូវផ្តល់សិទ្ធិឱ្យមន្ទីរពេទ្យជាដៃគូដើម្បីផ្ទេរកំណត់ត្រាវេជ្ជសាស្ត្ររបស់អតិថិជន ទៅកាន់ក្រុមហ៊ុនសម្រាប់ការរក្សាទុក និងដំណើរការតាមរយៈកម្មវិធី។ នៅពេលដែលអតិថិជនផ្តល់ការអនុញ្ញាតបែបនេះដល់មន្ទីរពេទ្យជាដៃគូ ក្រុមហ៊ុនមានសិទ្ធិទទួលបាន រក្សាទុក ប្រើប្រាស់ និងដំណើរការផ្សេងទៀតនៃកំណត់ត្រាវេជ្ជសាស្ត្រដែលពាក់ព័ន្ធសម្រាប់គោលបំណងដែលមានចែងក្នុងប្រការ ៩.៤ ខាងក្រោម ហើយក្រុមហ៊ុនមិនតម្រូវឱ្យទទួលបានការយល់ព្រមដាច់ដោយឡែក ឬបន្ថែមដោយផ្ទាល់ពីអតិថិជនសម្រាប់ ដំណើរការបែបនេះទេ។ ក្រុមហ៊ុនអាចពឹងផ្អែកលើទម្រង់នៃការយល់ព្រម ឯកសារអនុញ្ញាត ឬការបញ្ជាក់ផ្សេងទៀតដែលផ្តល់ដោយមន្ទីរពេទ្យជាដៃគូពាក់ព័ន្ធ ជាភស្តុតាងដែលថាអតិថិជនបានយល់ព្រមចំពោះការផ្ទេរ និងដំណើរការកំណត់ត្រាវេជ្ជសាស្ត្រ។`,
        },
        {
          type: 'para',
          text: `ដើម្បីជៀសវាងការយល់ច្រលំ ប្រសិនបើអតិថិជនមិនអនុញ្ញាតឱ្យផ្ទេរកំណត់ត្រាវេជ្ជសាស្ត្រ អតិថិជនអាចនៅតែប្រើប្រាស់សេវាកម្មបាន។ យ៉ាងណាមិញ មុខងារ ឬលក្ខណៈពិសេសមួយចំនួនដែលទាក់ទងនឹងការរក្សាទុកកំណត់ត្រាវេជ្ជសាស្ត្រ ការចូលប្រើប្រាស់ ឬការបន្តការថែទាំមិនត្រូវមានទៀតទេ។`,
        },
        {
          type: 'item',
          label: '៩.៣',
          text: `ការដំណើរការព័ត៌មានមូលដ្ឋាន៖`,
        },
        {
          type: 'para',
          text: `តាមរយៈទទួលយល់ព្រមនូវខ និង លក្ខខណ្ឌនេះ អតិថិជនអនុញ្ញាតឱ្យក្រុមហ៊ុន៖`,
        },
        {
          type: 'item',
          label: '(ក)',
          text: `ប្រមូល និងរក្សាទុកព័ត៌មានមូលដ្ឋានរបស់អតិថិជនតាមរយៈកម្មវិធី និង Hotline។`,
        },
        {
          type: 'item',
          label: '(ខ)',
          text: `ប្រើប្រាស់ព័ត៌មានមូលដ្ឋាន ដើម្បីចុះឈ្មោះ និងគ្រប់គ្រងគណនីរបស់អតិថិជន ដំណើរការការកក់ ចេញវិក័យប័ត្រ ទំនាក់ទំនងជាមួយអតិថិជនទាក់ទងនឹងសេវាកម្ម ដោះស្រាយបណ្ដឹង ស្វែងរក និងការពារការឆបោក ឬការរំលោភបំពាន និងអនុវត្តតាមច្បាប់ជាធរមាន។`,
        },
        {
          type: 'item',
          label: '(គ)',
          text: `ចែករំលែកព័ត៌មានមូលដ្ឋានជាមួយមន្ទីរពេទ្យជាដៃគូពាក់ព័ន្ធយ៉ាងតឹងរ៉ឹងក្នុងកម្រិតចាំបាច់ ដើម្បីឱ្យមន្ទីរពេទ្យជាដៃគូទទួលបាន កំណត់អត្តសញ្ញាណ និងផ្តល់សេវាវេជ្ជសាស្រ្តដល់អតិថិជន។`,
        },
        {
          type: 'item',
          label: '(ឃ)',
          text: `ចែករំលែកព័ត៌មានមូលដ្ឋានជាមួយអ្នកផ្តល់សេវា ដែលទទួលបានការអនុញ្ញាតពីក្រុមហ៊ុន (រួមទាំងអ្នកផ្តល់សេវាដឹកជញ្ជូន អ្នកផ្តល់កន្លែងស្នាក់នៅ អ្នកបកប្រែ អ្នកដំណើរការការទូទាត់ និងអ្នកផ្តល់សេវាបច្ចេកវិទ្យាព័ត៌មាន) យ៉ាងតឹងរ៉ឹងក្នុងវិសាលភាពចាំបាច់ ដើម្បីអនុវត្តសេវាកម្មដែលពាក់ព័ន្ធ ដែលរួមមានកាតព្វកិច្ចរក្សាការសម្ងាត់ និងការការពារទិន្នន័យ ដែលបានដាក់ចេញលើអ្នកផ្តល់សេវានោះ។ និង`,
        },
        {
          type: 'item',
          label: '(ង)',
          text: `បង្ហាញព័ត៌មានមូលដ្ឋានដល់អាជ្ញាធរមានសមត្ថកិច្ច ដែលតម្រូវដោយច្បាប់ជាធរមាន ឬដោយដីការបស់តុលាការ ឬស្ថាប័ននិយ័តកម្ម។`,
        },
        {
          type: 'item',
          label: '៩.៤',
          text: `ដំណើរការកំណត់ត្រាវេជ្ជសាស្ត្រ៖`,
        },
        {
          type: 'para',
          text: `នៅពេលដែលអតិថិជនបានអនុញ្ញាតឱ្យមន្ទីរពេទ្យជាដៃគូផ្ទេរកំណត់ត្រាវេជ្ជសាស្ត្ររបស់អតិថិជនទៅក្រុមហ៊ុន ក្រុមហ៊ុនត្រូវមានសិទ្ធិ៖`,
        },
        {
          type: 'item',
          label: '(ក)',
          text: `ទទួលបានកំណត់ត្រាវេជ្ជសាស្ត្របញ្ជូនដោយមន្ទីរពេទ្យជាដៃគូ។`,
        },
        {
          type: 'item',
          label: '(ខ)',
          text: `រក្សាទុកកំណត់ត្រាវេជ្ជសាស្ត្រនៅលើប្រព័ន្ធសុវត្ថិភាព។`,
        },
        {
          type: 'item',
          label: '(គ)',
          text: `ធ្វើឱ្យកំណត់ត្រាវេជ្ជសាស្ត្ររបស់អតិថិជនមាននៅលើកម្មវិធី ស្របតាមសិទ្ធិចូលប្រើរបស់អតិថិជន។`,
        },
        {
          type: 'item',
          label: '(ឃ)',
          text: `បញ្ជូនកំណត់ត្រាវេជ្ជសាស្ត្រទៅមន្ទីរពេទ្យជាដៃគូផ្សេងទៀតតាមសំណើរបស់អតិថិជនសម្រាប់គោលបំណងនៃការព្យាបាលបន្ថែម ការពិគ្រោះយោបល់ ឬណែនាំវេជ្ជសាស្រ្ត។ និង`,
        },
        {
          type: 'item',
          label: '(ង)',
          text: `បង្ហាញកំណត់ត្រាវេជ្ជសាស្រ្តដល់អាជ្ញាធរមានសមត្ថកិច្ច ក្នុងករណីដែលតម្រូវដោយច្បាប់ជាធរមាន ឬដោយដីការបស់តុលាការ ឬស្ថាប័ននិយ័តកម្ម។`,
        },
        {
          type: 'para',
          text: `ក្រុមហ៊ុននឹងមិនប្រើប្រាស់កំណត់ត្រាវេជ្ជសាស្រ្តសម្រាប់គោលបំណងណាមួយដែលមិនបានអនុញ្ញាត ច្បាស់លាស់ ក្រោមខ និង លក្ខខណ្ឌនេះ ឬច្បាប់ដែលមានជាធរមាន។`,
        },
        {
          type: 'item',
          label: '៩.៥',
          text: `នៅពេលដែលអតិថិជនស្នើសុំ ឬអនុញ្ញាតឱ្យក្រុមហ៊ុនផ្ទេរកំណត់ត្រាវេជ្ជសាស្ត្ររបស់អតិថិជន ឬទិន្នន័យផ្ទាល់ខ្លួនផ្សេងទៀតទៅកាន់មន្ទីរពេទ្យជាដៃគូ ដែលមានទីតាំងនៅប្រទេសវៀតណាមសម្រាប់គោលបំណង នៃការពិគ្រោះជំងឺ ការកក់ការណាត់ជួប ការពិនិត្យ ការព្យាបាល ឬសេវាកម្មពាក់ព័ន្ធ អតិថិជននឹងត្រូវចាត់ទុកថាបានយល់ព្រម ចំពោះការផ្ទេរទិន្នន័យផ្ទាល់ខ្លួនឆ្លងដែនរវាងប្រទេសកម្ពុជា និងប្រទេសវៀតណាម។`,
        },
        {
          type: 'para',
          text: `ក្រុមហ៊ុនត្រូវធានាថាការផ្ទេរណាមួយត្រូវបានអនុវត្តតាមរយៈបណ្តាញបញ្ជូន ដែលមានសុវត្ថិភាព និងអនុលោមតាមច្បាប់ និងបទប្បញ្ញត្តិជាធរមាននៃព្រះរាជាណាចក្រកម្ពុជាទាក់ទងនឹងការការពារទិន្នន័យ ឯកជនភាព និងទំនាក់ទំនងអេឡិចត្រូនិក។ ក្រុមហ៊ុនក៏ត្រូវអនុវត្តវិធានការបច្ចេកទេស និងវិធានសមស្របផងដែរ ដើម្បីការពារការសម្ងាត់ និងសុវត្ថិភាពនៃទិន្នន័យផ្ទាល់ខ្លួនដែលបានផ្ទេរ។`,
        },
        {
          type: 'item',
          label: '៩.៦',
          text: `លុះត្រាតែមានការស្នើសុំផ្សេងពីអតិថិជន ឬតម្រូវដោយច្បាប់ជាធរមាន ក្រុមហ៊ុនអាចរក្សាទុកទិន្នន័យផ្ទាល់ខ្លួនរបស់អតិថិជនសម្រាប់រយៈពេលរហូតដល់ប្រាំ (៥) ឆ្នាំគិតចាប់ពីថ្ងៃដែលការកក់ចុងក្រោយដែលធ្វើឡើងដោយអតិថិជនត្រូវបានបំពេញរួចរាល់ ឬត្រូវបានបញ្ចប់។ នៅពេលផុតកំណត់នៃរយៈពេលរក្សាទុកដែលអាចអនុវត្តបាន ឬតាមសំណើផ្លូវការរបស់អតិថិជនដែលត្រូវបានអនុញ្ញាតដោយច្បាប់ជាធរមាន ក្រុមហ៊ុនត្រូវប្រើខិតខំប្រឹងប្រែងទៅតាមលទ្ធភាពសមស្រប ដើម្បីលុប ឬបំផ្លាញទិន្នន័យផ្ទាល់ខ្លួនដែលពាក់ព័ន្ធ ប្រកបដោយសុវត្ថិភាព លើកលែងតែការរក្សាទុកបន្ត ដែលតម្រូវដោយច្បាប់ជាធរមាន។`,
        },
      ],
    },
    {
      num: '១០',
      title: 'ការអះអាង និងការកម្រិតការទទួលខុសត្រូវ',
      blocks: [
        {
          type: 'item',
          label: '១០.១',
          text: `ក្នុងវិសាលភាពដែលអនុញ្ញាតដោយច្បាប់ជាធរមាន សេវាកម្មដែលផ្តល់ជូននៅលើមូលដ្ឋាន "តាមដែលអាចរកបាន (as available)" ។ ក្រុមហ៊ុនមិនធានាថាកម្មវិធី ឬ Hotline នឹងមិនមានការរំខាន គ្មានបញ្ហា ឬមិនមានសមាសធាតុបង្កគ្រោះថ្នាក់ឡើយ។`,
        },
        {
          type: 'item',
          label: '១០.២',
          text: `ក្រុមហ៊ុនមិនទទួលខុសត្រូវចំពោះអតិថិជននូវ៖`,
        },
        {
          type: 'item',
          label: '(ក)',
          text: `ទង្វើ ការលុបចោល ការអនុវត្ត គុណភាពសេវាកម្ម ភាពដែលអាចរកបាន (availability) ការធ្វេសប្រហែស ការប្រព្រឹត្តមិនត្រឹមត្រូវ ឬការបាត់បង់ ឬការខូចខាតណាមួយដែលកើតឡើងពីសេវាកម្មដែលផ្តល់ដោយអ្នកផ្តល់សេវាភាគីទីបី ក៏ដូចជាដោយមន្ទីរពេទ្យជាដៃគូណាមួយ ឬបុគ្គលិករបស់ខ្លួនទាក់ទងនឹងសេវាវេជ្ជសាស្រ្តដែលផ្តល់ដល់អតិថិជន។`,
        },
        {
          type: 'item',
          label: '(ខ)',
          text: `ការសម្រេចចិត្តណាមួយដែលធ្វើឡើងដោយអតិថិជនដោយផ្អែកលើព័ត៌មានដែលបង្ហាញនៅលើកម្មវិធី ឬចែករំលែកដោយមន្ទីរពេទ្យដៃគូ។`,
        },
        {
          type: 'item',
          label: '(គ)',
          text: `ការបាត់បង់ណាមួយដែលកើតឡើងពីការខកខានរបស់អតិថិជនក្នុងការផ្តល់នូវទិន្នន័យផ្ទាល់ខ្លួនឱ្យបានត្រឹមត្រូវ ចូលរួមក្នុងការណាត់ជួប អនុលោមតាមតម្រូវការធ្វើដំណើរ ឬទិដ្ឋាការ ឬធ្វើតាមការណែនាំវេជ្ជសាស្រ្ត។`,
        },
        {
          type: 'item',
          label: '(ឃ)',
          text: `ការខូចខាតដោយប្រយោល ផលវិបាក ភាពចៃដន្យ លក្ខណៈពិសេស ការដាក់ទណ្ឌកម្ម រួមទាំងការបាត់បង់ប្រាក់ចំណេញ ការបាត់បង់ឱកាស ការបាត់បង់កេរ្តិ៍ឈ្មោះ ឬការបាត់បង់ទិន្នន័យ។ ឬ`,
        },
        {
          type: 'item',
          label: '(ង)',
          text: `ព្រឹត្តិការណ៍ប្រធានសក្តិ។`,
        },
        {
          type: 'item',
          label: '១០.៣',
          text: `ទំនួលខុសត្រូវរបស់ក្រុមហ៊ុនចំពោះអតិថិជនទាក់ទងនឹងការទាមទារណាមួយ ដែលកើតចេញពី ឬពាក់ព័ន្ធនឹង ខ និង លក្ខខណ្ឌនេះ ដោយមិនគិតពីមូលហេតុនៃសកម្មភាព មិនត្រូវលើសពីចំនួនដែលស្មើនឹងថ្លៃកម្រៃសេវាសរុប ដែលអតិថិជនបានបង់ជាក់ស្ដែងមកកាន់ក្រុមហ៊ុន ទាក់ទងនឹងការកក់ដែលពាក់ព័ន្ធ ដែលបណ្តាលឱ្យមានការទាមទារ។ គ្មានអ្វីនៅក្នុងខ និង លក្ខខណ្ឌនេះកំណត់ ឬមិនរាប់បញ្ចូលនូវការទទួលខុសត្រូវដែលមិនអាចកំណត់ដោយច្បាប់ ឬមិនរាប់បញ្ចូល នៅក្រោមច្បាប់ជាធរមាននោះទេ។`,
        },
      ],
    },
    {
      num: '១១',
      title: 'សំណងការខូចខាត',
      blocks: [
        {
          type: 'para',
          text: `អតិថិជនត្រូវទូទាត់សង និងការពារក្រុមហ៊ុន និង ក្រុមហ៊ុនបុត្រសម្ព័ន្ធរបស់ខ្លួន ព្រមទាំងប្រធាន មន្រ្តី បុគ្គលិក និងភ្នាក់ងាររបស់ខ្លួនពីការទាមទារទាំងអស់ ការខាតបង់ ការខូចខាត ទំនួលខុសត្រូវ ការចំណាយ និងសោហ៊ុយនានា (រួមទាំងថ្លៃសេវាផ្លូវច្បាប់សមស្រប) ដែលកើតឡើងចេញពី ឬពាក់ព័ន្ធនឹង៖ (ក) ការបំពានរបស់អតិថិជនលើខ និង លក្ខខណ្ឌនេះ។ (ខ) ព័ត៌មានមិនច្បាស់លាស់ មិនពេញលេញ ឬបំភាន់ដែលផ្តល់ដោយអតិថិជន។ (គ) ការទាមទារណាមួយដោយមន្ទីរពេទ្យជាដៃគូ អ្នកផ្តល់សេវាភាគីទីបី ឬបុគ្គលផ្សេងទៀតដែលបណ្តាលមកពីទង្វើ ឬការខកខានរបស់អតិថិជន។ ឬ (ឃ) ការបំពានណាមួយដោយអតិថិជន ចំពោះច្បាប់ជាធរមាន។`,
        },
      ],
    },
    {
      num: '១២',
      title: 'បណ្ដឹង',
      blocks: [
        {
          type: 'item',
          label: '១២.១',
          text: `អតិថិជនអាចដាក់ពាក្យបណ្តឹងទាក់ទងនឹងសេវាកម្មតាមរយៈ៖`,
        },
        {
          type: 'item',
          label: '(ក)',
          text: `មុខងារជំនួយអតិថិជនក្នុងកម្មវិធី`,
        },
        {
          type: 'item',
          label: '(ខ)',
          text: `Hotline 0978 119 119`,
        },
        {
          type: 'item',
          label: '(គ)',
          text: `អ៊ីម៉ែលទៅកាន់ info_customercare@metfone.com.kh ឬ`,
        },
        {
          type: 'item',
          label: '(ឃ)',
          text: `សេចក្តីជូនដំណឹងជាលាយលក្ខណ៍អក្សរ ផ្ញើទៅទីតាំងអាជីវកម្មចម្បងរបស់ក្រុមហ៊ុន។`,
        },
        {
          type: 'item',
          label: '១២.២',
          text: `បណ្តឹងណាមួយត្រូវដាក់ជូនក្នុងរយៈពេលបី (៣) ថ្ងៃនៃថ្ងៃធ្វើការ ចាប់ពីកាលបរិច្ឆេទនៃព្រឹត្តិការណ៍ដែលបណ្តាលឱ្យមានការតវ៉ា។ ពាក្យបណ្តឹងទាក់ទងនឹងសេវាវេជ្ជសាស្រ្តដែលទទួលបានពីមន្ទីរពេទ្យជាដៃគូត្រូវដោះស្រាយដោយផ្ទាល់ទៅកាន់មន្ទីរពេទ្យជាដៃគូពាក់ព័ន្ធ។`,
        },
        {
          type: 'item',
          label: '១២.៣',
          text: `ក្រុមហ៊ុនត្រូវស្រាវជ្រាវ និងផ្តល់ការឆ្លើយតបជាលាយលក្ខណ៍អក្សរដល់អតិថិជនក្នុងរយៈពេលប្រាំពីរ (៧) ថ្ងៃនៃថ្ងៃធ្វើការ ចាប់ពីពេលបានទទួលពាក្យបណ្តឹងដែលមានសុពលភាព ឬក្នុងករណីមានភាពស្មុគស្មាញ ក្នុងរយៈពេលសាមសិប (៣០) ថ្ងៃធ្វើការ។ អតិថិជន និងក្រុមហ៊ុនត្រូវប្រឹងប្រែងទៅតាមលទ្ធភាពសមស្រប ដើម្បីដោះស្រាយវិវាទណាមួយប្រកបដោយសន្តិវិធី។ ប្រសិនបើអតិថិជនមិនពេញចិត្តនឹងលទ្ធផលនៃបណ្តឹងនោះ អតិថិជនអាចបញ្ជូនវិវាទដើម្បីដោះស្រាយ ដោយអនុលោមតាមប្រការ ១៣។`,
        },
        {
          type: 'item',
          label: '១២.៤',
          text: `អតិថិជនមិនត្រូវផ្សព្វផ្សាយដោយផ្ទាល់ ឬដោយប្រយោល បង្ហោះ ប្រាស្រ័យទាក់ទង ឬផ្សព្វផ្សាយផ្សេងទៀត ដែលបង្ខូចដល់កេរ្តិ៍ឈ្មោះ ប្រមាថដល់កេរ្តិ៍ឈ្មោះ ផ្ដល់នូវភាពមិនពិត ឬការយល់ច្រឡំទាក់ទងនឹងក្រុមហ៊ុន ក្រុមហ៊ុនបុត្រសម្ព័ន្ធរបស់ក្រុមហ៊ុន ព្រមទាំងមន្រ្តី បុគ្គលិក និងភ្នាក់ងាររបស់ក្រុមហ៊ុន មិនថានៅលើប្រព័ន្ធផ្សព្វផ្សាយសង្គម ការពិនិត្យវេទិកា ឬ កម្មវិធី ឬបណ្តាញផ្សេងទៀត។ អតិថិជនទទួលស្គាល់ថាការបំពានណាមួយនៃប្រការនេះអាចបណ្តាលឱ្យមានផលប៉ះពាល់ធ្ងន់ធ្ងរបំផុត ដែលមិនអាចជួសជុល/សះជាបាន ដល់ក្រុមហ៊ុន ហើយក្រុមហ៊ុនមានសិទ្ធិស្វែងរកដំណោះស្រាយដែលមានតាមផ្លូវច្បាប់ និងទទួលបានសំណងសមស្របពីអតិថិជន។`,
        },
      ],
    },
    {
      num: '១៣',
      title: 'ច្បាប់គ្រប់គ្រង និងដំណោះស្រាយវិវាទ',
      blocks: [
        {
          type: 'item',
          label: '១៣.១',
          text: `ខ និង លក្ខខណ្ឌទាំងនេះត្រូវគ្រប់គ្រងដោយ និងបកស្រាយស្របតាមច្បាប់នៃព្រះរាជាណាចក្រកម្ពុជា។ ប្រសិនបើបទប្បញ្ញត្តិណាមួយនៃលក្ខខណ្ឌទាំងនេះ ត្រូវបានចាត់ទុកថាគ្មានសុពលភាព ឬមិនអាចអនុវត្តបាន បទប្បញ្ញត្តិនោះត្រូវកាត់ផ្ដាច់ចេញ ហើយបទប្បញ្ញត្តិដែលនៅសល់នឹងបន្តមានប្រសិទ្ធភាព និងអនុវត្តពេញលេញ។`,
        },
        {
          type: 'item',
          label: '១៣.២',
          text: `វិវាទណាមួយដែលកើតចេញពី ឬពាក់ព័ន្ធនឹងខ និង លក្ខខណ្ឌនេះ រួមទាំងសំណួរទាក់ទងនឹងអត្ថិភាព សុពលភាព ការអនុវត្ត ឬការបញ្ចប់ នឹងត្រូវបញ្ជូនទៅ និងជាចុងក្រោយត្រូវដោះស្រាយ ដោយមជ្ឈត្តការនៃព្រះរាជាណាចក្រកម្ពុជា ដោយអនុលោមតាមវិធានស្ដីពីមជ្ឈត្តការ នៃមជ្ឈមណ្ឌលជាតិនៃមជ្ឈត្តការផ្នែកពាណិជ្ជកម្ម ("NCAC") ដែលកំពុងមានជាធរមាន នៅពេលចាប់ផ្តើមនៃមជ្ឈត្តកម្ម និង យោងទៅតាមប្រការនេះ វិធានស្ដីពីមជ្ឈត្តការត្រូវបានចាត់ទុកថាត្រូវបានដាក់បញ្ចូលជាផ្នែកនៃខ និង លក្ខខណ្ឌ នេះ។ វេទិការមជ្ឈត្តកម្ម រួមមានមជ្ឈត្តករម្នាក់។ មជ្ឈត្តកម្មត្រូវធ្វើឡើងជាភាសាអង់គ្លេស។ រាល់ការចំណាយទាំងអស់ដែលកើតឡើងក្នុងការដោះស្រាយវិវាទ ត្រូវទទួលខុសត្រូវទាំងស្រុងដោយភាគីដែលចាញ់ លុះត្រាណាតែ NCAC សម្រេចខុសពីនេះ ដោយអនុលោមតាមវិធានស្ដីពីមជ្ឈត្តការរបស់ NCAC។ ទីកន្លែងធ្វើមជ្ឈត្តការគឺនៅ រាជធានីភ្នំពេញ ព្រះរាជាណាចក្រកម្ពុជា។`,
        },
      ],
    },
    {
      num: '១៤',
      title: 'បទប្បញ្ញត្តិទូទៅ',
      blocks: [
        {
          type: 'item',
          label: '១៤.១',
          text: `រាល់កម្មសិទ្ធិបញ្ញាទាំងអស់ រួមមាន ម៉ាកសញ្ញា និមិត្តសញ្ញា (logo) សិទ្ធិអ្នកនិពន្ធ និងសម្ភារៈនានាដែលជាកម្មសិទ្ធិរបស់ក្រុមហ៊ុន ត្រូវបន្តស្ថិតក្រោមកម្មសិទ្ធិផ្តាច់មុខរបស់ក្រុមហ៊ុន។`,
        },
        {
          type: 'item',
          label: '១៤.២',
          text: `រាល់ការខកខាន ឬការយឺតយ៉ាវដោយក្រុមហ៊ុន ក្នុងការអនុវត្តសិទ្ធិ អំណាច ឬដំណោះស្រាយណាមួយក្រោមខ និង លក្ខខណ្ឌនេះ ឬការបន្តអនុវត្តខ និងលក្ខខណ្ឌនេះ មិនត្រូវចាត់ទុកថាជាការបោះបង់ចោលនូវសិទ្ធិ អំណាច ឬដំណោះស្រាយទាំងនោះឡើយ រួមទាំងសិទ្ធិក្នុងការទាមទារសំណងចំពោះការខាតបង់ ឬការខូចខាតណាមួយដែលកើតចេញពីការរំលោភលើខ និងលក្ខខណ្ឌនេះឡើយ។`,
        },
        {
          type: 'item',
          label: '១៤.៣',
          text: `ក្រុមហ៊ុនរក្សាសិទ្ធិក្នុងការកែប្រែលក្ខខណ្ឌទាំងនេះនៅពេលណាក៏បាន ដោយការបិទផ្សាយលក្ខខណ្ឌ ដែលបានធ្វើបច្ចុប្បន្នភាពនៅទីតាំងអាជីវកម្មរបស់ខ្លួន ឬនៅលើគេហទំព័រ។ ទោះជាយ៉ាងណាក៏ដោយ លក្ខខណ្ឌដែលមានប្រសិទ្ធភាព នៅពេលដែលសេវាកម្មត្រូវបានទទួលយកដោយក្រុមហ៊ុន នឹងបន្តគ្រប់គ្រង និងអនុវត្តចំពោះសេវាកម្មនោះ រហូតដល់សេវាកម្មត្រូវបានបញ្ចប់ជាស្ថាពរ។`,
        },
        {
          type: 'item',
          label: '១៤.៤',
          text: `គ្មានចំណុចណាមួយនៅក្នុងលក្ខខណ្ឌទាំងនេះ ត្រូវបកស្រាយថាជាការបង្កើតភាពជាដៃគូ សហគ្រាសរួមគ្នា ភ្នាក់ងារ អ្នកម៉ៅការឯករាជ្យ ឬទំនាក់ទំនងការងាររវាងក្រុមហ៊ុន និងអតិថិជនឡើយ។ ភាគីនីមួយៗធ្វើសកម្មភាពក្នុងនាមខ្លួន និងសម្រាប់គណនីផ្ទាល់ខ្លួនរបស់ខ្លួន ហើយត្រូវទទួលខុសត្រូវលើបុគ្គលិក ប្រតិបត្តិការ និងកាតព្វកិច្ចផ្លូវច្បាប់រៀងៗខ្លួន។ គ្មានភាគីណាមួយមានសិទ្ធិក្នុងការតំណាង ឬចងកាតព្វកិច្ចឱ្យភាគីម្ខាងទៀតតាមរូបភាពណាមួយឡើយ។`,
        },
        {
          type: 'item',
          label: '១៤.៥',
          text: `ក្នុងករណីមានការបកប្រែខ និងលក្ខខណ្ឌនេះជាភាសាផ្សេង ភាសាអង់គ្លេសត្រូវមានអាទិភាពក្នុងករណីមានទំនាស់ ឬភាពមិនស៊ីសង្វាក់គ្នាណាមួយ។`,
        },
      ],
    },
    {
      num: '១៥',
      title: 'ការទទួលស្គាល់ និងការយល់ព្រម',
      blocks: [
        {
          type: 'para',
          text: `តាមរយៈការប្រើប្រាស់ ការកក់ ឬ ការទទួលសេវាកម្ម អតិថិជនទទួលស្គាល់ថាខ្លួនបានអាន យល់ច្បាស់ និងយល់ព្រមអនុវត្តតាមខ និងលក្ខខណ្ឌដូចដែលបានកំណត់។`,
        },
      ],
    },
  ],
}

export const TERMS_CONTENT = { en, km } as const

export type TermsLanguage = keyof typeof TERMS_CONTENT

export function getTermsDoc(language: string | null | undefined): TermsDoc {
  const base = (language ?? 'en').toLowerCase().split('-')[0]
  if (base === 'km' || base === 'kh') {
    return TERMS_CONTENT.km
  }
  return TERMS_CONTENT.en
}
