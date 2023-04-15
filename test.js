const mongoose =require("mongoose")
const transportPolicy = require('./models/transportpolicy-details')

    mongoose.connect('mongodb+srv://dattasandeep000:13072003@sandy.p06ijgx.mongodb.net/G1?retryWrites=true&w=majority')

        .then(result => {
            console.log('database Connected.....')
            const data1 = new transportPolicy({
                name: 'THIRD PARTY LIABILITY',
                term: 'ANNUAL',
                type: 'TRANSPORT',
                amount: 3425,
                //buy policy
                details: '1. Subject to the limits of liability as laid down in the Schedule hereto the Company will indemnify the insured in the event of an accident caused by or arising out of the use of the Motor Vehicle anywhere in India against all sums including claimant’s costs and expenses which the insured shall become legally liable to pay in respect of:  \n' +
                    'a. Death of or bodily injury to any person so far as it is necessary to meet the requirements of the Motor Vehicles Act.\n' +
                    ' b. Damage to property other than property belonging to the insured or held in trust or in the custody or control of the insured up to the limit specified in the schedule. \n' +
                    '2. The Company will pay all costs and expenses incurred with its written consent. \n' +
                    '3. In terms of and subject to the limitations of the indemnity which is granted by this policy to the insured, the Company will indemnify any driver who is driving the Motor vehicle on the insured’s order or with insured’s permission provided that such driver shall as though he/she were the insured observe, fulfill and be subject to the terms exceptions and conditions of this Policy in so far as they apply. \n' +
                    '4. In the event of the death of any person entitled to indemnity under this policy the Company will in respect of the liability incurred by such person indemnify his/her personal representative in terms of and subject to the limitations of this Policy provided that such personal representative shall as though such representative was the insured observe, fulfill and be subject to the terms exceptions and conditions of this Policy in so far as they apply. \n' +
                    '5. The Company may at its own option \n' +
                    'a. Arrange for representation at any Inquest or Fatal Inquiry in respect of any death which may be the subject of indemnity under this Policy; and\n' +
                    ' b. Undertake the defense of proceedings in any Court of Law in respect of any act or alleged offence causing or relating to any event which may be the subject of indemnity under this Policy.\n',
                TC:'This Policy and the Schedule shall be read together and any word or expression to which a specific meaning has been attached in any part of this Policy or of the Schedule shall bear the same meaning wherever it may appear. \n' +
                    '1. Notice shall be given in writing to the Company immediately upon the occurrence of any accident and in the event of any claim. Every letter, claim, writ, summons and/or process or copy thereof shall be forwarded to the Company immediately on receipt by the insured. Notice shall also be given in writing to the Company immediately after the insured shall have knowledge of any impending prosecution, inquest or fatal inquiry in respect of any accident which may give rise to a claim under this Policy. \n' +
                    '2. No admission, offer, promise, payment, or indemnity shall be made or given by or on behalf of the insured without the written consent of the Company which shall be entitled if it so desires to take over and conduct in the name of the insured the defence or settlement of any claim or to prosecute in the name of the insured for its own benefit any claim for indemnity or otherwise and shall have full discretion in the conduct of any proceedings or in the settlement of any claim and the insured shall give all such information and assistance as the Company may require. If the Company shall make any payment in settlement of any claim and such payment includes any amount not covered by this Policy the insured shall repay to the Company the amount not so covered. \n' +
                    '3. The insured shall take all reasonable steps to maintain insured vehicle in efficient condition and the Company shall have at all times free and full access to examine the Insured vehicle or any part thereof or any driver or employee of the insured.\n' +
                    ' 4. If at the time of occurrence of an event that gives rise to any claim under this policy there is in existence any other insurance covering the same liability, the Company shall not be liable to pay or contribute more than its ratable proportion of any compensation, cost or expense. \n' +
                    '6. The due observance and fulfillment of the terms, conditions and endorsements of this Policy in so far as they relate to anything to be done or complied with by the insured and the truth of the statements and answers in the said proposal shall be conditions precedent to any liability of the Company to make any payment under this Policy.\n' +
                    ' 7. In the event of the death of the sole insured, this policy will not immediately lapse but will remain valid for a period of three months from the date of the death of insured or until the expiry of this policy (whichever is earlier). During the said period, legal heir(s) of the insured to whom the custody and use of the Motor Vehicle passes may apply to have this Policy transferred to the name(s) of the heir(s) or obtain a new insurance policy for the Motor Vehicle. Where such legal heir(s) desire(s) to apply for transfer of this policy or obtain a new policy for the vehicle such heir(s) should make an application to the Company accordingly within the aforesaid period. All such applications should be accompanied by: \n' +
                    'a. Death Certificate in respect of the insured\n' +
                    ' b. Proof of title to the vehicle\n' +
                    ' c. Original Policy\n',
                GE:'1. The Company shall not be liable in respect of any claim arising whilst the vehicle insured herein a. being used otherwise than in accordance with the “Limitations as to Use” or b. being driven by or is for the purpose of being driven by him/her in the charge of any person other than a Driver as stated in the Driver’s Clause \n' +
                    '2. The Company shall not be liable in respect of any claim arising out of any contractual liability;\n' +
                    ' 3. Except so far as is necessary to meet the requirements of the Motor Vehicles Act, the Company shall not be liable in respect of death arising out of and in the course of employment of a person in the employment of the insured or in the employment of any person who is indemnified under this policy or bodily injury sustained by such person arising out of and in the course of such employment. 4. Except so far as is necessary to meet the requirements of the Motor Vehicles Act, the Company shall not be liable in respect of death or bodily injury to any person (other than a passenger carried by reason of or in pursuance of a contract of employment) being carried in or upon or entering or mounting or alighting from the Motor Vehicle at the time of the occurrence of the event out of which any claim arises.\n' +
                    ' 5. The Company shall not be liable in respect of any liability directly or indirectly or proximately or remotely occasioned by contributed by or traceable to or arising out of or in connection with War, Invasion, the Act of foreign enemies, hostilities or warlike operations (whether before or after declaration of war), Civil War, Mutiny, Rebellion Military or usurped power or by any direct or indirect consequences of any of the said occurrences and in the event of any claim hereunder, the Insured shall prove that the accident, loss, damage and/or liability, arose independently of and was in no way connected with or occasioned by or contributed to by or traceable to any of the said occurrences or any consequences thereof and in default of such proof, the Company shall not be liable to make any payment in respect of such a claim. \n' +
                    '6. The Company shall not be liable in respect of any liability directly or indirectly caused by or contributed to by or arising from nuclear weapons material.\n',
                benefits:'Discounts\n' +
                    'The following are the discounts available on the premium payable.\n' +
                    'Vintage Cars - Cars manufactured prior to 31.12.40 and duly certified by the Vintage and Classic Cars Club of India :\n' +
                    'A discount of 25% on the OD rates is available. Policies issued covering these vehicles are Agreed Value Policies.\n' +
                    '\n' +
                    'No Claim Bonus :\n' +
                    'Ranging from 20% to 50% depending on the number of claim free years.\n' +
                    '\n' +
                    'Faster claim when repair done garages affiliated with us.\n' +
                    '\n' +
                    'Automobile Association Membership Discount :\n' +
                    'Discount of 5% on the Own Damage premium subject to a maximum of Rs. 200/- for private cars and Rs. 50/- for Motorised Two wheelers only.\n' +
                    '\n' +
                    'Discount for Anti Theft Devices :\n' +
                    'A discount of 2.5% on the OD component of premium subject to a maximum of Rs. 200/-. Device approved by the ARAI Pune - installation of the same in vehicle certified by the Automobile Association of India.\n' +
                    '\n' +
                    '50% discount on the OD premium on the vehicle specialy designed / modified for use of the blind handicapped and mentally challenged persons\n' +
                    'Use of vehicles withing Insured\'s premises/sites :\n' +
                    'A discount of 33 1/1 % on the tariff rates is permissible.',
            })
            data1.save().then(()=>{
                console.log('data1 saved')
            })
        })
        .catch(err => {
            console.log(err);
        });
