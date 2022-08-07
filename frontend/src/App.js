import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import data from "./data";
import metroData from "./metroData";
import BarChart1 from "./components/BarChart1";
import BarChart2 from "./components/BarChart2";
import BarChart3 from "./components/BarChart3";
import PieChart1 from "./components/PieChart1";
import LineChart1 from "./components/LineChart1";
import SvgTest from "./components/SvgTest";
import DoughnutChart1 from "./components/DoughnutChart1";
import Consumption from "./components/Consumption";
import Table1 from "./components/Table1";
import { BuildingFactory2, Plug, Leaf, InfoCircle, SortDescending2} from "tabler-icons-react";

import {
  SegmentedControl,
  Title as Title1,
  Divider,
  Card,
  Tooltip,
  Group,
  Tabs,
  createStyles,
  Button,
  SimpleGrid,
  Paper,
  Text,
  Container,
  Center,
  AppShell,
  Header,
  useMantineTheme,
  Burger,
  MediaQuery,
  Footer,
  Aside,
  Skeleton,
  Navbar,
  Space,
  RingProgress,
} from "@mantine/core";
import { Title } from "chart.js";

function App() {
  const [data1, setData1] = useState(data);
  console.log("data1", data1);
  const [opened, setOpened] = useState(false);
  const [type, setType] = useState("graph");
  const [active, setActive]= useState('tab1')
  const theme = useMantineTheme();
  

  const useStyles = createStyles((theme) => ({
    label: {
      lineHeight: 1,
    },
    item: {
      height: 200,
      lineHeight: 1,
    },
    item2: {
      display: "flex",
      flexDirection: "column",
      position: "relative",
      height: "100%",
      // alignItems: "center",

      '& Text':{
        lineHeight: 1,
      },

      [`@media (max-width: 755px)`]: {
        flexDirection: "row",
      },
    },
    card2: {
      display: "flex",
      flexDirection: "column",
      position: "relative",
      height: "100%",
      alignItems: "center",

      '& Text':{
        lineHeight: 1,
      },

      [`@media (max-width: 755px)`]: {
        flexDirection: "row",
      },
    },
    ring:{
      marginLeft: 'auto',
      marginRight: 'auto',
      

      [`@media (max-width: 755px)`]: {
        marginLeft: 10,
        marginRight: 10,
      
      },
    },
    ringtest:{
      width: '100px',
      height: '100px',

      
      [`@media (max-width: 755px)`]: {
        width: '70px',
      height: '70px',
      
      },
    },
    ringInfo:{
      lineHeight: 1,
      alignItem: "center",
    },
    values:{
      [`@media (max-width: 755px)`]: {
        paddingLeft: 30,
      },
    },
    tt: {
      position: "absolute",
      right: "10px",
      top: "10px",
      zIndex: 100,
    },
    itemtext: {
      fontSize: 25,
      lineHeight: 1,
    },
    itemtext2: {
      fontSize: 20,
      lineHeight: 1,
      bottom: 0,
    },
    sections: {
      scrollMarginTop: 80,
    },
    navlist:{
      borderRight: "2px",
      borderColor: "black",
      borderRadius: "10px",
      
      
      '& a':{
        lineHeight: 1.55,
        textDecoration: 'none',
        padding: 10,
        backgroundColor: 'none',
        marginTop: 10,
        display: 'block',
        color: 'black',
        borderRadius: "10px",
      }
    },
   active:{
      
      
        lineHeight: 1.55,
        textDecoration: 'none',
        padding: 10,
        backgroundColor: theme.colors.gray[2],
        marginTop: 10,
        display: 'block',
        color: 'black',
        borderRadius: "10px",
        fontWeight: 500,
      
    },
    inactive:{
      
      
      lineHeight: 1.55,
      textDecoration: 'none',
      padding: 10,
      backgroundColor: 'white',
      marginTop: 10,
      display: 'block',
      color: 'green',
      borderRadius: "10px",
      transition: '150ms ease',
    '&:hover':{
      backgroundColor: theme.colors.gray[2],
      fontWeight: 500,
    }
  },
  }));
  const { classes } = useStyles();

  //test
  // const fetchData = async () => {
  //   let url =
  //     "https://bigdata.kepco.co.kr/openapi/v1/powerUsage/houseAve.do?year=2020&month=11&metroCd=11&cityCd=12&apiKey=Q12Rg5406HgHHO60H1403SfGd36mp02VQ7FnTGxK&returnType=json";

  //   const response = await fetch(url);
  //   const data = await response.json();
  //   console.log("tester", data);
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  let fuel = data1.reduce((total, item) => {
    const { fuel, pcap } = item;
    // console.dir(fuel)
    if (!fuel) return total;
    if (!total[fuel]) {
      total[fuel] = { label: fuel, value: 1, capacity: pcap };
    } else {
      total[fuel] = {
        ...total[fuel],
        value: total[fuel].value + 1,
        capacity: total[fuel].capacity + pcap,
      };
    }
    return total;
  }, {});
  console.log("fuel",fuel);

  const mostFuel = Object.values(fuel).sort((a, b) => {
    return b.value - a.value;
  }); //number of plants grouped by fuel type
  // console.dir(mostFuel);
  const mostFuelCap = Object.values(fuel).sort((a, b) => {
    return b.capacity - a.capacity;
  }); //power plant generation capacity grouped by capacity
  console.log("mostFuelCap",mostFuelCap);

  //largest generation facility for each fuel type
  let largestByFuel = data1.reduce((total, item, index) => {
    const { fuel, pcap } = item;
    // console.dir(fuel)
    if (!fuel) return total;
    if (!total[fuel]) {
      total[fuel] = { label: fuel, capacity: pcap };
    } else if (pcap > total[fuel].capacity) {
      total[fuel] = { ...total[fuel], capacity: pcap };
      console.dir("yes");
    }

    return total;
  }, {});
  console.log("largestByFuel",largestByFuel);

  let genSource = data1.reduce((total, item) => {
    const { genSrc, pcap } = item;
    // console.dir(fuel)
    if (!genSrc) return total;
    if (!total[genSrc]) {
      total[genSrc] = { label: genSrc, value: 1, capacity: pcap };
    } else {
      total[genSrc] = {
        ...total[genSrc],
        value: total[genSrc].value + 1,
        capacity: total[genSrc].capacity + pcap,
      };
    }
    return total;
  }, {});
  console.log("genSource",genSource);

  //total number of power plants in Korea
  let totalPlant = data1.length;

  //total capacity of all power plants in korea
  let totalCapacity = Math.round(
    mostFuelCap.reduce((total, item) => {
      total += item.capacity; //john smilga

      return total;
    }, 0)
  );
  console.log("totalCapacity",totalCapacity);

  // //total capacity of renewable energy (filter does not work)
  // let totalRenCapacity = mostFuelCap.filter(item => (item.label=="태양광"||"원자력" ||"부생가스" ||"수력" ||"풍력" ||"바이오매스" ||"해양에너지")).reduce((total, item) => {

  //     total += item.capacity;

  //   return total;
  // }, 0);
  // console.dir(totalRenCapacity);
  // console.log(mostFuelCap.filter((item) =>{return item.label===("태양광"||"원자력"||"부생가스"||"수력"||"풍력"||"바이오매스"||"해양에너지")}))

  let renewableCapacity = mostFuelCap.filter((item) => {
    if (
      item.label === "태양광" ||
      item.label === "원자력" ||
      item.label === "부생가스" ||
      item.label === "수력" ||
      item.label === "풍력" ||
      item.label === "바이오매스" ||
      item.label === "해양에너지"
    ) {
      return item;
    }
  });
  console.dir(renewableCapacity);

  //total capacity of renewable energy
  let totalRenCapacity = mostFuelCap.reduce((total, item) => {
    if (
      item.label === "태양광" ||
      item.label === "원자력" ||
      item.label === "부생가스" ||
      item.label === "수력" ||
      item.label === "풍력" ||
      item.label === "바이오매스" ||
      item.label === "해양에너지"
    ) {
      total += item.capacity;
    }
    return total;
  }, 0);
  console.log("totalRenCapacity",totalRenCapacity);

  const renPercent = Math.round((totalRenCapacity / totalCapacity) * 100);
  console.dir(renPercent);

  let mostFuelType = mostFuelCap[0]; //highest generation capacity by single fuel type
  console.dir(mostFuelType);
  let mostFuelTypePercent = Math.round(
    (mostFuelType.capacity / totalCapacity) * 100
  );

  let energySummary = mostFuelCap.map((v) => {
    return v.label;
  });
  console.dir(energySummary);

  //check number of companies
  let company = data1.reduce((total, item) => {
    const { company, pcap } = item;
    // console.dir(fuel)

    if (!company) return total;
    if (!total[company]) {
      total[company] = { label: company, value: 1, capacity: pcap };
    } else {
      total[company] = {
        ...total[company],
        value: total[company].value + 1,
        capacity: total[company].capacity + pcap,
      };
    }

    return total;
  }, {});
  console.dir(company);
  const mostCompany = Object.values(company).sort((a, b) => {
    return b.value - a.value;
  });
  console.dir(mostCompany); //number of plants owned by each company
  const mostCompanyTop = mostCompany.slice(0, 25);
  console.dir(mostCompanyTop);

  //area: not needed as it divides into ony 3 types (urban, non-urban, Jeju)
  let area = data1.reduce((total, item) => {
    const { area } = item;
    // console.dir(fuel)
    if (!area) return total;
    if (!total[area]) {
      total[area] = { label: area, value: 1 };
    } else {
      total[area] = { ...total[area], value: total[area].value + 1 };
    }
    return total;
  }, {});
  console.dir(area);

  return (
    <main>
      <section>
        {/* AppShell from Mantine */}
        <AppShell
          styles={{
            main: {
              background:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[8]
                  : theme.colors.gray[1],
            },
          }}
          navbarOffsetBreakpoint="sm"
          asideOffsetBreakpoint="sm"
          fixed
          navbar={
            <Navbar
              p="md"
              hiddenBreakpoint="sm"
              hidden={!opened}
              width={{ sm: 200, lg: 220 }}
            >
              <div
                className={classes.navlist}
                onClick={(e) => setActive(e.target.id)}
              >
                <a
                  href="#Overview"
                  id="tab0"
                  className={
                    active == "tab0" ? classes.active : classes.inactive
                  }
                >
                  Power Generation Overview
                </a>
                <a
                  href="#DailyEnergy"
                  id="tab1"
                  className={
                    active == "tab1" ? classes.active : classes.inactive
                  }
                >
                  Average Energy Use
                </a>
                <a
                  href="#DailyTrade"
                  id="tab2"
                  className={
                    active == "tab2" ? classes.active : classes.inactive
                  }
                >
                  Daily Electricity Trade{" "}
                </a>
                <a
                  href="#Corporation"
                  id="tab3"
                  className={
                    active == "tab3" ? classes.active : classes.inactive
                  }
                >
                  Power Corporations{" "}
                </a>
                <a
                  href="#FuelComp"
                  id="tab4"
                  className={
                    active == "tab4" ? classes.active : classes.inactive
                  }
                >
                  Fuel Type Composition{" "}
                </a>
                <a
                  href="#RenComp"
                  id="tab5"
                  className={
                    active == "tab5" ? classes.active : classes.inactive
                  }
                >
                  Renewable Type Composition{" "}
                </a>
              </div>
            </Navbar>
          }
          header={
            <Header height={60} p="md">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                  lineHeight: 60,
                }}
              >
                <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                  <Burger
                    opened={opened}
                    onClick={() => setOpened((o) => !o)}
                    size="sm"
                    color={theme.colors.gray[6]}
                    mr="xl"
                  />
                </MediaQuery>

                <Text>Application header</Text>
              </div>
            </Header>
          }
        >
          <div className="Container">
            <Container size={1140} px={0}>
              <SimpleGrid
                id="Overview"
                className={classes.sections}
                cols={5}
                breakpoints={[
                  { maxWidth: 980, cols: 2, spacing: "xs" },
                  { maxWidth: 755, cols: 1, spacing: "xs" },
                ]}
              >
                <div>
                  <Paper
                    shadow="md"
                    radius="md"
                    p="md"
                    className={classes.item2}
                  >
                    <BuildingFactory2 size={40} />

                    <Space h="lg" />
                    <div className={classes.values}>
                      <Text weight={600} className={classes.itemtext}>
                        {totalPlant.toLocaleString()}
                      </Text>
                      <Text color="dimmed">Total generation facility</Text>
                    </div>
                    <div className={classes.tt}>
                      <Tooltip
                        wrapLines
                        width={150}
                        withArrow
                        transition="fade"
                        transitionDuration={120}
                        label="The total number of power generation facilities within South Korea"
                      >
                        <InfoCircle size={20} />
                      </Tooltip>
                    </div>
                  </Paper>
                </div>

                {/* <div>
                <Paper shadow="md" radius="md" p="md" className={classes.item}>
                  <Group position="apart">
                    <BuildingFactory2 size={40} />
                    <Tooltip
                      wrapLines
                      width={150}
                      withArrow
                      transition="fade"
                      transitionDuration={120}
                      label="The total number of power generation facilities within South Korea"
                    >
                      <InfoCircle size={20} />
                    </Tooltip>
                  </Group>

                  <Space h="lg" />
                  <Text weight={600} className={classes.itemtext}>
                    {totalPlant.toLocaleString()}
                  </Text>
                  <Text color="dimmed">Total generation facility</Text>
                </Paper>
              </div> */}

                <div>
                  <Paper
                    shadow="md"
                    radius="md"
                    p="md"
                    className={classes.item2}
                  >
                    <Plug size={40} />

                    <Space h="lg" />
                    <div className={classes.values}>
                      <Group spacing={5}>
                        <Text weight={600} className={classes.itemtext}>
                          {totalCapacity.toLocaleString()}
                        </Text>
                        <Text weight={600} className={classes.itemtext2}>
                          MW
                        </Text>
                      </Group>
                      <Text color="dimmed">Total generation capacity</Text>
                    </div>
                    <div className={classes.tt}>
                      <Tooltip
                        wrapLines
                        width={150}
                        withArrow
                        transition="fade"
                        transitionDuration={120}
                        label="The total power generation capacity within South Korea"
                      >
                        <InfoCircle size={20} />
                      </Tooltip>
                    </div>
                  </Paper>
                </div>
                {/* <div>
                <Paper shadow="md" radius="md" p="md" className={classes.item}>
                  <Plug size={40} />

                  <Space h="lg" />
                  <Group spacing={5}>
                    <Text weight={600} className={classes.itemtext}>
                      {totalCapacity.toLocaleString()}
                    </Text>
                    <Text weight={600} className={classes.itemtext2}>
                      MW
                    </Text>
                  </Group>
                  <Text color="dimmed">Total generation capacity</Text>
                </Paper>
              </div> */}
                <div>
                  <Paper
                    shadow="md"
                    radius="md"
                    p="md"
                    className={classes.item2}
                  >
                    <Leaf size={40} />
                    <Space h="lg" />
                    <div className={classes.values}>
                      <Group spacing={5}>
                        <Text weight={600} className={classes.itemtext}>
                          {Math.round(totalRenCapacity).toLocaleString()}
                        </Text>
                        <Text weight={600} className={classes.itemtext2}>
                          MW
                        </Text>
                      </Group>
                      <Text color="dimmed">Total renewable capacity</Text>
                    </div>
                    <div className={classes.tt}>
                      <Tooltip
                        wrapLines
                        width={150}
                        withArrow
                        transition="fade"
                        transitionDuration={120}
                        label="The total renewable power generation capacity within South Korea"
                      >
                        <InfoCircle size={20} />
                      </Tooltip>
                    </div>
                  </Paper>
                </div>
                {/* <div>
                <Paper shadow="md" radius="md" p="md" className={classes.item}>
                  <Leaf size={40} />
                  <Space h="lg" />
                  <Group spacing={5}>
                    <Text weight={600} className={classes.itemtext}>
                      {Math.round(totalRenCapacity).toLocaleString()}
                    </Text>
                    <Text weight={600} className={classes.itemtext2}>
                      MW
                    </Text>
                  </Group>
                  <Text color="dimmed">Total renewable capacity</Text>
                </Paper>
              </div> */}
                <div>
                  <Paper
                    shadow="md"
                    radius="md"
                    p="xs"
                    className={classes.card2}
                  >
                    <RingProgress
                      classNames={{root:classes.ringtest}}
                      size={100}
                      thickness={6}
                      sections={[{ value: renPercent, color: "#0f9583" }]}
                      label={
                        <Text
                          color="#0f9583"
                          weight={700}
                          align="center"
                          size="xl"
                        >
                          {renPercent}%
                        </Text>
                      }
                    />
                    <Text color="dimmed" className={classes.ringInfo}>
                      Total renewable capacity
                    </Text>
                  </Paper>
                </div>
                <div>
                  <Paper
                    shadow="md"
                    radius="md"
                    p="xs"
                    className={classes.card2}
                  >
                    <RingProgress
                      className={classes.ring}
                      size={100}
                      thickness={6}
                      breakpoints={[
                        { maxWidth: 755, size: 80}
                      ]}
                      sections={[
                        { value: mostFuelTypePercent, color: "#ff7070" },
                      ]}
                     
                      label={
                        <div>
                          <Text
                            color="#ff7070"
                            weight={700}
                            align="center"
                            size="xl"
                            className={classes.label}
                          >
                            {mostFuelType.label}
                          </Text>
                          <Text
                            color="#ff7070"
                            weight={700}
                            align="center"
                            size="lg"
                            className={classes.label}
                          >
                            {mostFuelTypePercent}%
                          </Text>
                        </div>
                      }
                    />
                    <Text color="dimmed">Highest capacity by Fuel type</Text>
                  </Paper>
                </div>
              </SimpleGrid>
            </Container>
            <Space h="md" />

            {/*components start here  */}
            <div id="DailyEnergy" className={classes.sections}>
              <Consumption data={metroData} />
            </div>
            <Space h="md" />
            <div id="DailyTrade" className={classes.sections}>
              <LineChart1 />
            </div>

            <Space h="md" />

            <div id="Corporation" className={classes.sections}>
              <Container size={1140} px={0}>
                <Card radius="md" shadow="md">
                  <Card.Section shadow="md">
                    <Group position="apart">
                      <Title1 order={4} px={15} py={15}>
                        Power corporations
                      </Title1>
                      <SegmentedControl
                        mx={15}
                        color="teal"
                        value={type}
                        onChange={setType}
                        data={[
                          { label: "Graph", value: "graph" },
                          { label: "Table", value: "table" },
                        ]}
                      />
                    </Group>
                    <Divider size="xs" />
                  </Card.Section>
                  {type == "graph" ? (
                    <BarChart3 data={company} />
                  ) : (
                    <Table1 data={company} />
                  )}
                  {/* <Tabs>
                  <Tabs.Tab label="Table">
                    <Table1 data={company} />
                  </Tabs.Tab>
                  <Tabs.Tab label="Chart">
                    <BarChart3 data={company} />
                  </Tabs.Tab>
                </Tabs> */}
                </Card>
              </Container>
            </div>

            {/* real */}
            <Space h="md" />
            <div id="FuelComp" className={classes.sections}>
              <Container size={1140} px={0}>
                <Card radius="md" shadow="md">
                  <Card.Section className={classes.title} shadow="md">
                    <Title1 order={4} px={15} py={15}>
                      Fuel type composition
                    </Title1>
                    <Divider size="xs" />
                  </Card.Section>
                  <Space h="md" />

                  <DoughnutChart1
                    data={mostFuelCap}
                    totalCapacity={totalCapacity}
                  />
                </Card>
              </Container>
            </div>
            <Space h="md" />

            <div id="RenComp" className={classes.sections}>
              <Container size={1140} px={0}>
              <Card radius="md" shadow="md">
                  <Card.Section className={classes.title} shadow="md">
                    <Title1 order={4} px={15} py={15}>
                      Renewable type composition
                    </Title1>
                    <Divider size="xs" />
                  </Card.Section>
                  <Space h="md" />

                  
                  
                  <DoughnutChart1 data={renewableCapacity} totalCapacity={totalRenCapacity}/>
                  </Card>
              </Container>
            </div>
            <Space h="md" />

            {/* <div>
            <Consumption data={metroData} />
          </div> */}

            
            {/* <div>
            <Container size={1140} px={0}>
              <Paper shadow="md" radius="md" p="md">
                <BarChart1 data={mostFuelCap} />
              </Paper>
            </Container>
          </div>
          <Space h="md" />
          <div>
            <Container size={1140} px={0}>
              <Paper shadow="md" radius="md" p="md">
                <BarChart2 data={mostFuel} />
              </Paper>
            </Container>
          </div>
          <Space h="md" /> */}

            {/* <div>
            <PieChart1 data={mostCompanyTop} />
          </div> */}
          </div>
        </AppShell>
      </section>
    </main>
  );
}

export default App;
