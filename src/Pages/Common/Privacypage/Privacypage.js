import React from 'react';
import { Footer } from '../../../Components/Footer/Footer';
import Navbar from '../../../Components/Navbar/Navbar';
import { LiaHandPointUpSolid } from 'react-icons/lia';
import './privacypage.scss';

const Privacypage = () => {
    return (
        <div className="main dark">
            <div className="mainWrap">
                <Navbar/>
                <div className={'privacy' + " glass brdr-rad"}>
                    <div className={'privacyWrap'}>

                        <div id='priTop' className={'priHeading'}>
                            <h1>PRIVACY NOTICE</h1>
                            <h5>Last Updated 01 Aug, 2023</h5>
                        </div>

                        <div className={'priContent'}>

                            {/* Information Trem & Plicy */}

                            <p>
                                Thank you for choosing to be part of our community at Satta Matka (" Company ", "we", "us", "our"). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice, or our practices with regards to your personal information, please contact us at support@srboss.com .
                                <br /><br /><br />
                                When you visit our website https://srboss.com (the "Website"), use our mobile application, as the case may be (the "App") and more generally, use any of our services (the "Services", which include the  Website and App ), we appreciate that you are trusting us with your personal information. We take your privacy very seriously. In this privacy notice, we seek to explain to you in the clearest way possible what information we collect, how we use it and what rights you have in relation to it. We hope you take some time to read through it carefully, as it is important. If there are any terms in this privacy notice that you do not agree with, please discontinue use of our Services immediately.
                                <br /><br /><br />
                                This privacy notice applies to all information collected through our Services (which, as described above, includes our  Website and App ), as well as, any related services, sales, marketing or events.
                                <br /><br />
                                <span>Please read this privacy notice carefully as it will help you understand what we do with the information that we collect.
                                </span>
                            </p>

                            {/*Table Content */}

                            <div className={'tableContent'}>
                                <h3>TABLE OF CONTENTS</h3>
                                <ul className={'tableConWrap'}>
                                    <li><a href="#q1">WHAT INFORMATION DO WE COLLECT?</a></li>
                                    <li><a href="#q2">HOW DO WE USE YOUR INFORMATION?</a></li>
                                    <li><a href="#q3">WILL YOUR INFORMATION BE SHARED WITH ANYONE?</a></li>
                                    <li><a href="#q4">DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</a></li>
                                    <li><a href="#q5">WHAT IS OUR STANCE ON THIRD-PARTY WEBSITES?</a></li>
                                    <li><a href="#q6">HOW LONG DO WE KEEP YOUR INFORMATION?</a></li>
                                    <li><a href="#q7">HOW DO WE KEEP YOUR INFORMATION SAFE?</a></li>
                                    <li><a href="#q8">DO WE COLLECT INFORMATION FROM MINORS?</a></li>
                                    <li><a href="#q9">WHAT ARE YOUR PRIVACY RIGHTS?</a></li>
                                    <li><a href="#q10">CONTROLS FOR DO-NOT-TRACK FEATURES</a></li>
                                    <li><a href="#q11">DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</a></li>
                                    <li><a href="#q12">DO WE MAKE UPDATES TO THIS NOTICE? </a>  </li>
                                    <li><a href="#q13">HOW CAN YOU CONTACT US ABOUT THIS NOTICE? </a>   </li>
                                    <li><a href="#q14"> HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?  </a>   </li>
                                </ul>

                            </div>

                            {/* table contants Answer */}

                            <div className={'tDetails'}>
                                <div className={'tDetailsWrap'}>
                                    {/* Faq 1 */}
                                    <div id='q1' className={'answrap'}>
                                        <div className={'heading'}>
                                            <h1>1. WHAT INFORMATION DO WE COLLECT?</h1>
                                        </div>
                                        <div className={'answerssfaq'}>
                                            <p>
                                                <span>Personal Information Provided by You: </span>Satta Matka collects personal information that you voluntarily provide when you register for an account, express an interest in their products or services, participate in activities on their website or app, or otherwise contact them. This information may include your name, email address, phone number, mailing address, username, password, contact preferences, contact or authentication data, debit/credit card numbers, and other similar information.<br /><br />
                                                <span>Payment Data : </span>Satta Matka may collect data necessary to process your payment if you make purchases, such as your payment instrument number (such as a credit card number) and the security code associated with your payment instrument. This data is stored by a third-party payment processor, and you can find their privacy notice link(s) here: [link].<br /><br />
                                                <span>Information Collected through Our App: </span>If you use Satta Matka's app, they also collect the following information:<br /><br />
                                                1. Geo-Location Information: Satta Matka may request access or permission to track your location from your mobile device, either continuously or while you are using their app. This is to provide certain location-based services. You can change their access or permissions in your device's settings.<br /><br />
                                                2. Mobile Device Data: Satta Matka automatically collects device information (such as your mobile device ID, model and manufacturer), operating system, version information and system configuration information, device and application identification numbers, browser type and version, hardware model, Internet service provider and/or mobile carrier, and Internet Protocol (IP) address (or proxy server). If you are using their app, they may also collect information about the phone network associated with your mobile device, your mobile device's operating system or platform, the type of mobile device you use, your mobile device's unique device ID and information about the features of their app you accessed.<br /><br />
                                                3. Push Notifications: Satta Matka may request to send you push notifications regarding your account or certain features of their app. You can opt-out from receiving these types of communications in your device's settings.<br /><br />

                                            </p>

                                        </div>


                                    </div>
                                    {/* FAQ 2*/}

                                    <div id='q2' className={'answrap'}>
                                        <div className={'heading'}>
                                            <h1>2. HOW DO WE USE YOUR INFORMATION?</h1>
                                        </div>
                                        <div className={'answerssfaq'}>
                                            <p>
                                                <span>Account creation and logon process:</span>Satta Matka uses the information you provide to create and manage your account, and to facilitate logon to the Services.<br /><br />
                                                <span>Testimonials: </span>Satta Matka may post testimonials on their website that contain personal information. Prior to posting a testimonial, they will obtain your consent to use your name and the content of the testimonial.<br /><br />
                                                <span>Feedback: </span>Satta Matka may use your information to request feedback and to contact you about your use of their Services.<br /><br />
                                                <span>User-to-user communications:</span> Satta Matka may use your information in order to enable user-to-user communications with each user's consent.<br /><br />
                                                <span>Manage user accounts:</span>Satta Matka may use your information for the purposes of managing their account and keeping it in working order.<br /><br />
                                                <span>Send administrative information to you:</span>Satta Matka may use your personal information to send you product, service and new feature information and/or information about changes to their terms, conditions, and policies.<br /><br />
                                                <span>Protect their Services: </span>Satta Matka may use your information as part of their efforts to keep their Services safe and secure (for example, for fraud monitoring and prevention).<br /><br />
                                                <span>Enforce their terms, conditions and policies: </span>Satta Matka may use your information to enforce their terms, conditions and policies for business purposes, to comply with legal and regulatory requirements or in connection with their contract.<br /><br />
                                                <span>Respond to legal requests and prevent harm:</span>If Satta Matka receives a subpoena or other legal request, they may need to inspect the data they hold to determine how to respond.<br /><br />
                                                <span>Fulfill and manage your orders:</span>Satta Matka may use your information to fulfill and manage your orders, payments, returns, and exchanges made through the Services.<br /><br />
                                                <span>Administer prize draws and competitions: </span>Satta Matka may use your information to administer prize draws and competitions when you elect to participate in their competitions.<br /><br />
                                                <span>Deliver and facilitate delivery of services to the user: </span>Satta Matka may use your information to provide you with the requested service.<br /><br />
                                                <span>Respond to user inquiries/offer support to users:</span> Satta Matka may use your information to respond to your inquiries and solve any potential issues you might have with the use of their Services.<br /><br />
                                                <span>Send you marketing and promotional communications:</span> Satta Matka and/or their third-party marketing partners may use the personal information you send to them for their marketing purposes, if this is in accordance with your marketing preferences. For example, when expressing an interest in obtaining information about them or their Services, subscribing to marketing or otherwise contacting them, they will collect personal information from you. You can opt-out of their marketing emails at any time.<br /><br />
                                                <span>Deliver targeted advertising to you: </span>Satta Matka may use your information to develop and display personalized content and advertising (and work with third parties who do so) tailored to your interests and/or location and to measure its effectiveness.<br /><br />

                                            </p>
                                        </div>


                                    </div>

                                    {/* FAq 3 */}

                                    <div id='q3' className={'answrap'}>
                                        <div className={'heading'}>
                                            <h1>3. WILL YOUR INFORMATION BE SHARED WITH ANYONE?</h1>
                                        </div>
                                        <div className={'answerssfaq'}>
                                            <p>
                                                A company can share user information under the following circumstances:<br /><br />
                                                1. With the user's consent.<br /><br />
                                                2. To comply with laws.<br /><br />
                                                3. To provide services to the user.<br /><br />
                                                4. To protect the user's rights.<br /><br />
                                                5. To fulfill business obligations.<br /><br />
                                                For example, a company may share user information with a third party in order to process payments, deliver goods, or provide customer support. The company may also share user information with law enforcement if it is required to do so by law.<br /><br />
                                                In some cases, a company may share user information with a third party without the user's consent. This may be done if the company has a legitimate interest in doing so, such as to improve its products or services. However, the company must still take steps to protect the user's privacy.<br /><br />
                                                <span>Here are some specific examples of when a company may share user information: /span</span><br /><br />
                                                1. A company may share user information with a third-party payment processor in order to process payments for goods or services that the user has purchased.<br /><br />
                                                2. A company may share user information with a shipping company in order to deliver goods that the user has purchased.<br /><br />
                                                3. A company may share user information with a customer support team in order to provide support to the user.<br /><br />
                                                4. A company may share user information with law enforcement if it is required to do so by law.<br /><br />
                                                5. A company may share user information with a third party for research purposes, but only if the company has anonymized the user data.<br /><br />
                                                It is important to note that the above is not an exhaustive list of all the circumstances in which a company may share user information. The specific circumstances in which a company may share user information will vary depending on the company's business practices and the laws of the jurisdiction in which it operates.<br /><br />
                                            </p>

                                        </div>
                                    </div>

                                    {/* FAQ 4 */}

                                    <div id='q4' className={'answrap'}>
                                        <div className={'heading'}>
                                            <h1>4. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</h1>
                                        </div>
                                        <div className={'answerssfaq'}>
                                            <p>
                                                1. Cookies and other tracking technologies are small files that are placed on your device when you visit a website.<br /><br />
                                                2. These technologies can be used to collect information about your browsing activity, such as the pages you visit, the links you click, and the time you spend on a website.<br /><br />
                                                3. This information can be used to track your online activity, target you with advertising, and improve the functionality of a website.<br /><br />
                                                4. You can choose to opt out of cookies by changing your browser settings. However, this may prevent you from using certain features of a website.<br /><br />
                                                <span> Here is a more detailed explanation of cookies and other tracking technologies:/span</span><br /><br />
                                                1. <span>Cookies: </span>A cookie is a small text file that is placed on your device when you visit a website. Cookies can be used to remember your preferences, such as your language setting, or to track your browsing activity.<br /><br />
                                                2. <span>Web beacons: </span> A web beacon is a small, invisible image that is placed on a website. Web beacons can be used to track your browsing activity by recording the pages you visit and the links you click.<br /><br />
                                                3. <span>Pixels:</span> A pixel is a small, invisible piece of code that is placed on a website. Pixels can be used to track your browsing activity by recording the pages you visit and the links you click.<br /><br />

                                            </p>
                                        </div>
                                    </div>
                                    {/* FAQ 5 */}

                                    <div id='q5' className={'answrap'}>
                                        <div className={'heading'}>
                                            <h1>5. WHAT IS OUR STANCE ON THIRD-PARTY WEBSITES?</h1>
                                        </div>
                                        <div className={'answerssfaq'}>
                                            <p>
                                                1. The website may contain advertisements from third-party providers that are not affiliated with the website.<br /><br />
                                                2. These third-party providers may collect information about you when you click on their advertisements.<br /><br />
                                                3. The website cannot guarantee the safety and privacy of this information.<br /><br />
                                                4. The website is not responsible for the content or privacy practices of these third-party providers.<br /><br />
                                                5. You should review the privacy policies of these third-party providers before clicking on their advertisements.<br /><br />
                                                <span> Here is a more detailed explanation of the points: </span><br /><br />
                                                1. The website may contain advertisements from third-party providers. These advertisements are typically placed on the website by an advertising network. The advertising network will collect information about you when you click on an advertisement, such as your IP address, the page you were visiting, and the advertisement you clicked on.<br /><br />
                                                2. The website cannot guarantee the safety and privacy of this information. The advertising network may use this information to track your online activity or to target you with advertising.<br /><br />
                                                3. The website is not responsible for the content or privacy practices of these third-party providers. The website does not have control over the way these third-party providers collect or use your information.<br /><br />
                                                4. You should review the privacy policies of these third-party providers before clicking on their advertisements. This will help you understand how they collect and use your information.<br /><br />
                                            </p>
                                        </div>
                                    </div>

                                    {/* FAQ 6*/}
                                    <div id='q6' className={'answrap'}>
                                        <div className={'heading'}>
                                            <h1>6. HOW LONG DO WE KEEP YOUR INFORMATION?</h1>
                                        </div>
                                        <div className={'answerssfaq'}>
                                            <p>
                                                We will only keep your personal information for as long as we need it for the purposes set out in this privacy notice. This may be longer than the period of time in which you have an account with us, if we are required to keep your information for legal reasons. When we no longer need your personal information, we will delete it or anonymize it. If we cannot delete or anonymize your personal information, we will securely store it and isolate it from further processing until it can be deleted.<br /><br />
                                                <span>Here is a more detailed explanation of the paragraph:</span><br /><br />
                                                1. We will only keep your personal information for as long as we need it for the purposes set out in this privacy notice, such as providing you with our products or services, complying with legal requirements, and protecting our interests.<br /><br />
                                                2. If we are required to keep your personal information for legal reasons, such as for tax or accounting purposes, we may need to keep it for longer than the period of time in which you have an account with us<br /><br />
                                                3. When we no longer need your personal information, we will delete it or anonymize it. This means that we will erase the information or make it impossible to identify you from the information.<br /><br />
                                                4. If we cannot delete or anonymize your personal information, we will securely store it and isolate it from further processing until it can be deleted. This means that we will keep the information in a safe place and will not use it for any other purposes.<br /><br />

                                            </p>
                                        </div>
                                    </div>
                                    {/* FAQ 7*/}
                                    <div id='q7' className={'answrap'}>
                                        <div className={'heading'}>
                                            <h1>7. HOW DO WE KEEP YOUR INFORMATION SAFE? </h1>
                                        </div>
                                        <div className={'answerssfaq'}>
                                            <p>
                                                We have implemented a system of organizational and technical security measures to protect your personal information. However, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure. Therefore, we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information.<br /><br />
                                                We will do our best to protect your personal information, but transmission of personal information to and from our Services is at your own risk. You should only access the Services within a secure environment.<br /><br />
                                                <span>Here are some additional tips for protecting your personal information:</span><br /><br />
                                                1. Use strong passwords and don't share them with anyone.<br /><br />
                                                2. Keep your software up to date.<br /><br />
                                                3. Be careful about what information you share online.<br /><br />
                                                4. Only use trusted websites.<br /><br />
                                                5. Be aware of phishing scams.<br /><br />
                                                6. Back up your data regularly.<br /><br />
                                            </p>
                                        </div>
                                    </div>
                                    {/* FAQ 8*/}
                                    <div id='q8' className={'answrap'}>
                                        <div className={'heading'}>
                                            <h1>8. DO WE COLLECT INFORMATION FROM MINORS? </h1>
                                        </div>
                                        <div className={'answerssfaq'}>
                                            <p>
                                                We do not knowingly collect data from or market to children under the age of 18. We believe that children under the age of 18 are more vulnerable to online risks and may not fully understand the implications of providing personal information online.<br /><br />
                                                If you are under the age of 18, you should not use our Services without the consent of your parent or guardian. If you are a parent or guardian and you believe that your child has provided us with personal information, please contact us at [email protected] and we will take steps to delete the information from our records.<br /><br />
                                                We also take steps to prevent children under the age of 18 from creating accounts on our Services. When we create an account, we ask users to provide their date of birth. If we learn that a user is under the age of 18, we will deactivate the account and take steps to delete the user's personal information from our records.<br /><br />
                                                If you have any questions about our privacy policy or our practices with respect to children, please contact us at [email protected]<br /><br />
                                            </p>
                                        </div>
                                    </div>
                                    {/* FAQ9 */}
                                    <div id='q9' className={'answrap'}>
                                        <div className={'heading'}>
                                            <h1>9. WHAT ARE YOUR PRIVACY RIGHTS? </h1>
                                        </div>
                                        <div className={'answerssfaq'}>
                                            <p>
                                                You can review, change, or terminate your account information at any time. You can do this by logging into your account and clicking on the "Settings" tab. <br /><br />
                                                You can also opt out of cookies and similar technologies by changing your browser settings. To opt-out of interest-based advertising by advertisers on our Services, you can visit [link].<br /><br />
                                                You can unsubscribe from our marketing email list at any time by clicking on the unsubscribe link in the emails that we send or by contacting us using the details provided below.<br /><br />
                                                We may still communicate with you after you unsubscribe from our marketing email list, for example to send you service-related emails that are necessary for the administration and use of your account, to respond to service requests, or for other non-marketing purposes. <br /><br />
                                                <span>Here are the contact details for unsubscribing from marketing emails and for other privacy-related inquiries:</span><br /><br />
                                                <span>Email: [email protected]</span><br /><br />
                                                <span>Phone: 1-800-555-1212</span><br /><br />
                                                <span>Mail: Srboss 123 Main Street Anytown, CA 12345</span><br /><br />
                                                <span>Here are some additional details about the account information section:</span><br /><br />
                                                1. You can review your account information at any time by logging into your account and clicking on the "Settings" tab. This includes your name, email address, password, and any other information that you have provided to us.<br /><br />
                                                2. You can change your account information at any time by logging into your account and clicking on the "Settings" tab. This includes your name, email address, password, and any other information that you have provided to us.<br /><br />
                                                3. You can terminate your account at any time by logging into your account and clicking on the "Settings" tab. This will delete your account and all of your information from our active databases. However, we may retain some information in our files to prevent fraud, troubleshoot problems, assist with any investigations, enforce our Terms of Use and/or comply with applicable legal requirements.<br /><br />
                                                4. You can opt out of cookies and similar technologies by changing your browser settings. To opt-out of interest-based advertising by advertisers on our Services, you can visit [link].<br /><br />
                                                5. You can unsubscribe from our marketing email list at any time by clicking on the unsubscribe link in the emails that we send or by contacting us using the details provided below. We may still communicate with you after you unsubscribe from our marketing email list, for example to send you service-related emails that are necessary for the administration and use of your account, to respond to service requests, or for other non-marketing purposes.<br /><br />

                                            </p>
                                        </div>
                                    </div>
                                    {/* FAQ 10 */}
                                    <div id='q10' className={'answrap'}>
                                        <div className={'heading'}>
                                            <h1>10. CONTROLS FOR DO-NOT-TRACK FEATURES </h1>
                                        </div>
                                        <div className={'answerssfaq'}>
                                            <p>
                                                Some browsers and devices have a Do-Not-Track (DNT) feature that you can activate to signal your preference not to be tracked online. However, there is no standard for how websites should respond to DNT signals, so we do not currently respond to them. If a standard for online tracking is adopted in the future, we will comply with it and update our privacy notice accordingly.<br /><br />
                                                <span>Here is a more detailed explanation of the point:</span><br /><br />
                                                1. Do-Not-Track (DNT) is a privacy preference that you can set in your browser or device. When you turn on DNT, your browser sends a signal to websites that you do not want to be tracked.<br /><br />
                                                2. However, there is no standard for how websites should respond to DNT signals. Some websites ignore DNT signals, while others may still track you even if you have DNT turned on.<br /><br />
                                                3. As a result, we do not currently respond to DNT signals. We believe that it is important to have a standard for online tracking before we start responding to DNT signals. This will ensure that everyone is treated fairly and that your privacy is protected.<br /><br />
                                                4. If a standard for online tracking is adopted in the future, we will comply with it and update our privacy notice accordingly. This will let you know how we will respond to DNT signals in the future.<br /><br />
                                            </p>
                                        </div>
                                    </div>
                                    {/* FAQ 11 */}
                                    <div id='q11' className={'answrap'}>
                                        <div className={'heading'}>
                                            <h1>11. DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS? </h1>
                                        </div>
                                        <div className={'answerssfaq'}>
                                            <p>
                                                1. California residents have specific rights regarding access to their personal information under the California Consumer Privacy Act (CCPA).<br /><br />
                                                2. California residents have the right to request information about the categories of personal information (if any) that we disclosed to third parties for direct marketing purposes and the names and addresses of all third parties with which we shared personal information in the immediately preceding calendar year.<br /><br />
                                                3. California residents under the age of 18 who have a registered account with a Service have the right to request removal of unwanted data that they publicly post on the Services.<br /><br />
                                                <span>Here is a more detailed explanation of the points:</span><br /><br />
                                                1. The CCPA is a California law that gives consumers more control over their personal information. The CCPA requires businesses to disclose the personal information they collect about consumers, how they use it, and who they share it with.<br /><br />
                                                2. Under the CCPA, California residents have the right to request a copy of the personal information that a business has collected about them. They also have the right to request that a business delete their personal information.<br /><br />
                                                3. The CCPA also gives California residents under the age of 18 the right to request that a business remove any unwanted data that they have publicly posted on the business's website or app.<br /><br />
                                            </p>
                                        </div>
                                    </div>
                                    {/* FAQ 12 */}
                                    <div id='q12' className={'answrap'}>
                                        <div className={'heading'}>
                                            <h1>12. DO WE MAKE UPDATES TO THIS NOTICE?    </h1>
                                        </div>
                                        <div className={'answerssfaq'}>
                                            <p>
                                                1. We may update this privacy notice from time to time to reflect changes in our practices or changes in the law.<br /><br />
                                                2. The updated version will be indicated by an updated "Revised" date.<br /><br />
                                                3. The updated version will be effective as soon as it is accessible.<br /><br />
                                                4. If we make material changes to this privacy notice, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification.<br /><br />
                                                5. We encourage you to review this privacy notice frequently to be informed of how we are protecting your information.<br /><br />
                                                <span>Here is a more detailed explanation of the paragraph:</span><br /><br />
                                                1. We may update this privacy notice from time to time to reflect changes in our practices or changes in the law. For example, if we start collecting new types of personal information or if we start using your personal information in new ways, we will update this privacy notice to reflect those changes.<br /><br />
                                                2. The updated version of the privacy notice will be indicated by an updated "Revised" date. This will let you know that the privacy notice has been updated and that you should review it to see the changes.<br /><br />
                                                3. The updated version of the privacy notice will be effective as soon as it is accessible. This means that the new terms will apply to any personal information that we collect or use after the updated privacy notice is accessible.<br /><br />
                                                4. If we make material changes to this privacy notice, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification. This notification will be sent to the email address that you have provided to us.<br /><br />
                                                5. We encourage you to review this privacy notice frequently to be informed of how we are protecting your information. You can access the most recent version of the privacy notice at any time on our website.<br /><br />
                                            </p>
                                        </div>
                                    </div>
                                    {/* FAQ 13 */}
                                    <div id='q13' className={'answrap'}>
                                        <div className={'heading'}>
                                            <h1>13. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?        </h1>
                                        </div>
                                        <div className={'answerssfaq'}>
                                            <p>
                                                If you have questions or comments about this privacy notice, you can contact us by:<br /><br />
                                                <span>Email: [email protected]</span><br /><br />
                                                <span>Mail: Srboss 123 Main Street Anytown, CA 12345</span><br /><br />
                                            </p>
                                        </div>
                                    </div>
                                    {/* FAQ 14 */}
                                    <div id='q14' className={'answrap'}>
                                        <div className={'heading'}>
                                            <h1>14. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?       </h1>
                                        </div>
                                        <div className={'answerssfaq'}>
                                            <p>
                                                <span>Under the applicable laws of your country, you may have certain rights with respect to your personal information. These rights may include the right to:</span><br /><br />
                                                1. Request access to the personal information that we collect about you.<br /><br />
                                                2. Request that we correct any inaccurate or incomplete personal information that we collect about you.<br /><br />
                                                3. Request that we delete your personal information in certain circumstances.<br /><br />
                                                4. Request that we restrict our processing of your personal information in certain circumstances.<br /><br />
                                                5. Object to our processing of your personal information for certain purposes.<br /><br />
                                                6. Receive your personal information in a structured, commonly used, and machine-readable format, and to transmit that information to another controller.<br /><br />
                                                7. Complain to a supervisory authority if you believe that your rights under data protection laws have been violated.<br /><br />
                                                The specific rights that you have may vary depending on the applicable laws of your country. If you have any questions about your rights, please contact us.<br /><br />
                                            </p>

                                        </div>
                                    </div>
                                </div>

                            </div>

                            {/* button */}
                            <div className={'iconUp'}>
                                <a href="#priTop"><LiaHandPointUpSolid /></a>
                            </div>

                        </div>

                        <Footer />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Privacypage