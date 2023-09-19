import React from 'react';
import './homepage.scss';
import TableListSwap from '../../../Components/TableListSwap/TableListSwap';
import Adds from '../../../Components/Adds/Adds';
import MatkaTableSwap from '../../../Components/MatkaTableSwap/MatkaTableSwap';
import NetWeekly from '../../../Components/NetWeekly/NetWeekly';
import GridResult from '../../../Components/GridResult/GridResult';
import WeekNumTable from '../../../Components/WeekNum/WeekNumTable';
import ChartList from '../../../Components/ChartList/ChartList';
import { BsQuestionDiamond } from 'react-icons/bs';
import { FaqOthers, faqEnglish, faqHindi, gridResultData, jodiChartList, netWeeklyData, pannelChartList, weeknumtableData } from '../../../Constants/dummy';
import { dateFormat } from '../../../Utils/DateFormat';
import { Footer } from '../../../Components/Footer/Footer';
import Navbar from '../../../Components/Navbar/Navbar';
import { Helmet } from 'react-helmet';



const Homepage = () => {
   return (
      <div className="main dark">
         <Helmet>
            <title>Homepage - SRboss.com</title>
         </Helmet>
         
         <div className="mainWrap">
            <Navbar/>
            <div className={'homepage'}>
               <div className={'homepageWrap'}>
                  {/* Header */}
                  <div className={'header' + " glass brdr-rad"}>
                     <div className={'content'}>
                        <h1>Welcome To <span>SR</span>BOSS.com</h1>
                        <p>Best Platform For Fast Results</p>
                     </div>
                  </div>

                  {/* Description */}

                  <div className={'desc' + " glass brdr-rad"}>
                     <h3><span className='txtlgt'>SRBOSS.COM</span> Satta Matka Fast Results</h3>
                     <p>We are the number one website for <span className='txtlgt'>Satta Matka</span> enthusiasts, offering lightning-fast results, daily free games, and expert predictions. Stay updated with Kalyan, Milan, Rajdhani, Ratan, Main Bazar, and International markets. Our accurate daily Final Ank and single open results boost your winning potential. Enjoy an ad-free platform with a seamless user interface, providing the best betting experience. Our dedicated admin ensures prompt assistance</p>
                  </div>

                  {/* Lucky Number */}

                  <div className={'seclucky' + " glass brdr-rad"}>
                     <h1 className='txtlgt'>Today's <span className='flash'>Lucky</span> Number</h1>
                     <h3>{dateFormat()}</h3>
                     <div className={'secluckyWrap'}>
                        <div className={'luckyCard'}>
                           <div className={'rotator'}></div>
                           <div className={'overlay'}>
                              <h1 className='txtlgt'><span className='flash'>(शुभांक)</span></h1>
                              <h3>{dateFormat()}</h3>
                           </div>
                        </div>
                        <div className={'luckyCard'}>
                           <div className={'rotator'}></div>
                           <div className={'overlay'}>
                              <h1 className='txtlgt'><span className='flash'>Final Ank</span></h1>
                              <h3>{dateFormat()}</h3>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Live Updates */}

                  <div className={'secLive' + " glass brdr-rad"}>
                     <h1 className='txtlgt'> <span className='bbl-flash'>Live</span> Updates <div className='flashing-dot' /> </h1>
                     <TableListSwap />

                  </div>

                  {/* Add section */}

                  <Adds addContent={"<p>अपना बाजार Srboss.com वेबसाइट में डलवाने</p><p>के लिए आज ही हमें ईमेल करे</p><a href='#'>support@Srboss.com</a><p>शर्ते लागु</p>"} />
                  <Adds addContent={"<p style= 'color:var(--neon-softgree);'>अब सभी मटका बाजार खेलो ऑनलाइन ऐप पर रोज खेलो रोज कमाओ अभी डाउनलोड करो</p><a>Play Online Matka</a><p style = 'color:var(--neon-softgree);'>With 100% Trusted App (NEW)</p><p style= 'color:var(--neon-softgree);'>Super Fast deposit and withdrawal</p>"} />
                  <Adds addContent={"<p style= 'color:var(--neon-blue); font-size:.5em;'>ATTA MATKA SATTA FAST RESULT KALYAN TOP MATKA RESULT KALYAN SATTA MATKA FAST RESULT MILAN RATAN RAJDHANI MAIN BAZAR MATKA FAST TIPS RESULT MATKA CHART JODI CHART PANEL CHART FREE FIX GAME SATTAMATKA ! MATKA MOBI SATTA 143 Srboss.com TOP NO1 RESULT FULL RATE MATKA ONLINE GAME PLAY BY APP Srboss</p>"} />

                  {/* World best Result HEADING */}

                  <Adds addContent={"<p >WORLD ME SABSE FAST SATTA MATKA RESULT</p>"} />

                  <div className={'matkaResultSection' + " glass brdr-rad"}>
                     <div className={'matkaResultSectionWrap'}>
                        <MatkaTableSwap />
                     </div>
                  </div>

                  {/* adds section again */}
                  <Adds addContent={"<p>Email for any inquiries Or Support: srboss.net@gmail.com</p>"} />

                  {/* Netweekly*/}

                  {netWeeklyData?.map((item, index) => {
                     return <NetWeekly key={index} title={item.title} content={item.content} />

                  })}

                  <Adds addContent={"<p style= 'color:var(--neon-musturd); font-size:.8em;'>FREE GAME ZONE OPEN-CLOSE</p>"} />
                  <Adds addContent={"<p style= 'color:var(--neon-purple); font-size:.7em;'>✔DATE:↬ : 01/08/2023 ↫</p><p style= 'color:var(--neon-purple); font-size:.7em;'>FREE GUESSING DAILY</p><p style= 'color:var(--neon-purple); font-size:.7em;'>OPEN TO CLOSE FIX ANK</p>"} />



                  {/* GRID  */}

                  <div className={'gridResult'}>
                     <div className={'gridResultWrap'}>

                        {/* <GridResult/> */}
                        {/* <GridResult title={"Animesh"} content={"<P>Nikita</P>"}/> */}

                        {gridResultData?.map((itm, ind) => {
                           return <GridResult key={ind} title={itm.title} content={itm.content} />
                        })}

                     </div>
                  </div>

                  {/*week Number Table  */}
                  {weeknumtableData.map((itm, ind) => {
                     return <WeekNumTable key={ind} title={itm.title} content={itm.content} />
                  })}

                  {/* Chart List */}

                  <ChartList title={"SATTA MATKA JODI CHART"} data={jodiChartList} />
                  <ChartList title={"MATKA PANNEL CHART"} data={pannelChartList} />

                  {/* FAQ Section */}

                  <div className={'faqSection' + " glass brdr-rad "}>
                     <div className={'faqWrap'}>
                        <p><span className='txtlgt'>Srboss.com</span> is a trusted leader in the Satta Matka gaming industry.
                           They offer all the essential information you need to boost your winning chances, including ancient charts,
                           live results, and the fastest and most accurate Matka guessing numbers, charts, and metrics. They also have
                           a guessing forum where you can get insights from seasoned players with over 20 years of experience in the industry.
                           However, it is important to note that Satta Matka is a gambling game and is illegal in India.
                           If you are caught gambling, you could face serious legal consequences. We urge you to reconsider gambling on Satta Matka.
                           There are many other ways to make money that are not illegal and do not carry the same risks.
                        </p>
                        <div className={'queAns'}>
                           {faqEnglish?.map((que, ind) => {
                              return (
                                 <details className={'details'} key={ind}>
                                    <summary className={'summary'}>
                                       {(ind + 1) + ". " + que.question}
                                       <div className={'faqIcon'}><BsQuestionDiamond /></div>
                                    </summary>
                                    <p dangerouslySetInnerHTML={{ __html: que.answer }} className={'ans'}></p>
                                 </details>
                              )

                           })}
                        </div>

                     </div>

                  </div>

                  {/* Hindi Question Anwser */}
                  <div className={'faqSection' + " glass brdr-rad "}>
                     <div className={'faqWrap'}>
                        <div className={'queAns'}>
                           {faqHindi?.map((que, ind) => {
                              return (
                                 <details className={'details'} key={ind}>
                                    <summary className={'summary'}>
                                       {(ind + 1) + ". " + que.question}
                                       <div className={'faqIcon'}><BsQuestionDiamond /></div>
                                    </summary>
                                    <p dangerouslySetInnerHTML={{ __html: que.answer }} className={'ans'}></p>
                                 </details>
                              )

                           })}
                        </div>

                     </div>

                  </div>
                  {/* Other Questions */}
                  <div className={'faqSection' + " glass brdr-rad "}>
                     <div className={'faqWrap'}>
                        <div className={'queAns'}>
                           {FaqOthers?.map((que, ind) => {
                              return (
                                 <details className={'details'} key={ind}>
                                    <summary className={'summary'}>
                                       {(ind + 1) + ". " + que.question}
                                       <div className={'faqIcon'}><BsQuestionDiamond /></div>
                                    </summary>
                                    <p dangerouslySetInnerHTML={{ __html: que.answer }} className={'ans'}></p>
                                 </details>
                              )

                           })}
                        </div>

                     </div>

                  </div>

                  <Adds addContent={"<h3>SATTA MARKET</h3> <p style = 'font-size:0.5em;'>Kalyan Matka | Satta Bazar | Satta Kurla | Satta | Srboss.com | SattaMatka11.in | Srboss.com | Org Mobi Net In | Satta Master | Matka Game | Kapil Indian Matka | Matka Parivar 24 | Prabhat Matka | Tara Matka | Golden Matka | SattaMatka.Com | Madhur Matka satta result chart, satta khabar, matka india net, satakmatak, satta chart 2019, satta bazar result, satta live, satta bajar, satta matka mumbai chart, satta live result, satta fast result, satta fast, satta today Number 94</p>"} />
                  <Adds addContent={"<h3>-:DISCLAIMER:-</h3> <p style = 'font-size:0.6em; color:var(--neon-blue);'>Viewing This WebSite Is On Your Own Risk All The information Shown On Website Is Based on Numerology and Astrology for Information Purposes We Are Not Associated with Any Illegal Matka Business or Gamblers We Warn You That Matka Gambling in Your Country May be Banned or Illegal... We Are Not Responsible For Any Issues or Scam... We Respect All Country Rules Laws... If You Not Agree With Our Site Disclaimer... Please Quit Our Site Right Now. Copying Promoting Publishing Any of Our Content in Any Type Of Media or Other Source is Illegal and against Law</p>"} />
                  <Adds addContent={"<h3 >MANAGED BY <span style = 'color:var(--neon-musturd); text-transform:uppercase;'>Srboss.com</span></h3>"} />
                  <Footer />

               </div>
            </div>
         </div>
      </div>
   )
}

export default Homepage