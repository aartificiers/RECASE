import React, { useEffect, useState } from 'react';
import './homepage.scss';
import TableListSwap from '../../../Components/TableListSwap/TableListSwap';
import Adds from '../../../Components/Adds/Adds';
import MatkaTableSwap from '../../../Components/MatkaTableSwap/MatkaTableSwap';
import NetWeekly from '../../../Components/NetWeekly/NetWeekly';
import GridResult from '../../../Components/GridResult/GridResult';
import WeekNumTable from '../../../Components/WeekNum/WeekNumTable';
import ChartList from '../../../Components/ChartList/ChartList';
import { BsQuestionDiamond, BsWhatsapp } from 'react-icons/bs';
import { FaqOthers, faqEnglish, faqHindi, gridResultData, jodiChartList, netWeeklyData, pannelChartList, weeknumtableData } from '../../../Constants/dummy';
import { dateFormat } from '../../../Utils/DateFormat';
import { Footer } from '../../../Components/Footer/Footer';
import Navbar from '../../../Components/Navbar/Navbar';
import { Helmet } from 'react-helmet';
import { API } from '../../../Services/Api';
import Marquee from 'react-fast-marquee';
import { logoutUser } from '../../../Utils/commonutil';
import { IoIosRefresh } from 'react-icons/io';



const Homepage = () => {

   const [luckyData, setLuckyData] = useState({});
   const [addsData, setAdData] = useState([]);
   const [guessingTable, setGuessingTable] = useState([]);
   const [jodiList,setJodiList]=useState([]);
   const [panelList,setPanelList]=useState([]);
   const [netWeekly,setNetWeekly]=useState([]);
   const [dayNight,setDayNight]=useState([]);
   const [toggle,setToggle]=useState(false);
   


   useEffect(() => {
      fetchLuckyData();
      fetchAds();
      fetchGuessingTableData();
      fetchAllJodis();
      fetchAllPanel();
      fetchNetweek();
      fetchDayNight();
   }, [toggle]);

   const fetchLuckyData = async () => {
      const response = await API.getluckyNum({ id: '6504c1e8c0972c9a038dd5a2' });
      if (response.isSuccess) {
         setLuckyData(response.data);
      }
   }
   const fetchAds = async () => {
      const res = await API.getAds();
      if (res.isSuccess) {
         setAdData(res.data.data);
      } else {
         console.log("error fetching");
      }
   }
   
   const fetchGuessingTableData = async () => {
      const res = await API.getGuessings();
      if (res.isSuccess) {
         setGuessingTable(res.data.data);
      } else {
         console.log("error fetching");
      }
   }
   const fetchAllJodis = async () => {
      const res = await API.getAllJodis();
      if (res.isSuccess) {
         setJodiList(res.data.data);
      } else {
         console.log("error fetching");
      }
   }
   const fetchAllPanel = async () => {
      const res = await API.getAllPanel();
      if (res.isSuccess) {
         setPanelList(res.data.data);
      } else {
         console.log("error fetching");
      }
   }

   const fetchNetweek=async()=>{
      const res = await API.getNetweek();
      if (res.isSuccess) {
          setNetWeekly(res.data.data);
      } else {
          console.log("error fetching");
      }
  }

  const fetchDayNight = async () => {
   const res = await API.getDayNight();
   if (res.isSuccess) {
       setDayNight(res.data.data);
   } else {
       console.log("error fetching");
   }
}



   return (
      <div className="main dark">
         <Helmet>
            <title>Homepage - SRboss.com</title>
         </Helmet>
         <a className='floating-btn whatsapp' href={"https://wa.me/9893447094?text=Hello%20from%20SR%20Boss%20Web"} target="_blank" rel="noopener noreferrer"><BsWhatsapp/></a>
         <button className='floating-btn refresh' onClick={()=>{setToggle(!toggle)}} ><IoIosRefresh/></button>

         <div className="mainWrap">
            <Navbar />
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
                              <h3>{luckyData?.shubhank}</h3>
                           </div>
                        </div>
                        <div className={'luckyCard'}>
                           <div className={'rotator'}></div>
                           <div className={'overlay'}>
                              <h1 className='txtlgt'><span className='flash'>Final Ank</span></h1>
                              <div className="marq-wrap">
                                 <div className="marquee">
                                    {luckyData.finalank?.length > 0 ? luckyData.finalank.map((item, indx) => {
                                       return <div className='marq-text' key={indx}>{item}</div>
                                    }) : null}
                                 </div>
                              </div>



                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Live Updates */}

                  <div className={'secLive' + " glass brdr-rad"}>
                     <h1 className='txtlgt'> <span className='bbl-flash'>Live</span> Updates <div className='flashing-dot' /> </h1>
                     <TableListSwap toggle={toggle} setToggle={setToggle}  />

                  </div>

                  {/* Add section */}

                  <Adds addContent={addsData[0]?.adContent} />
                  <Adds addContent={addsData[1]?.adContent} />
                  <Adds addContent={"<p style= 'color:var(--neon-blue); font-size:.5em;'>SATTA MATKA SATTA FAST RESULT KALYAN TOP MATKA RESULT KALYAN SATTA MATKA FAST RESULT MILAN RATAN RAJDHANI MAIN BAZAR MATKA FAST TIPS RESULT MATKA CHART JODI CHART PANEL CHART FREE FIX GAME SATTAMATKA ! MATKA MOBI SATTA 143 Srboss.com TOP NO1 RESULT FULL RATE MATKA ONLINE GAME PLAY BY APP Srboss</p>"} />

                  {/* World best Result HEADING */}

                  <Adds addContent={"<p >WORLD ME SABSE FAST SATTA MATKA RESULT</p>"} />

                  <div className={'matkaResultSection' + " glass brdr-rad"}>
                     <div className={'matkaResultSectionWrap'}>
                        <MatkaTableSwap toggle={toggle} setToggle={setToggle} />
                     </div>
                  </div>

                  {/* adds section again */}
                  <Adds addContent={addsData[2]?.adContent} />

                  {/* Netweekly*/}

                  {netWeekly?.map((item, index) => {
                     return <NetWeekly key={index} title={item.title} content={item.content} />
                  })}

                  <Adds addContent={addsData[3]?.adContent} />
                  <Adds addContent={addsData[4]?.adContent} />



                  {/* GRID  */}

                  <div className={'gridResult'}>
                     <div className={'gridResultWrap'}>

                        {/* <GridResult/> */}
                        {/* <GridResult title={"Animesh"} content={"<P>Nikita</P>"}/> */}

                        {dayNight?.map((itm, ind) => {
                           return <GridResult key={ind} title={itm.title} content={itm.content} />
                        })}

                     </div>
                  </div>

                  {/*week Number Table  */}
                  {guessingTable?.map((itm, ind) => {
                     return <WeekNumTable key={ind} title={itm.title} content={itm.content} />
                  })}

                  {/* Chart List */}

                  <ChartList title={"SATTA MATKA JODI CHART"} data={jodiList} path={'/home/jodi/'} refer={'j'} />
                  <ChartList title={"MATKA PANNEL CHART"} data={panelList} path={'/home/panel/'} refer={'p'} />

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