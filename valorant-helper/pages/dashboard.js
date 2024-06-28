import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Flex,
    Heading,
    Avatar,
    AvatarGroup,
    Text,
    Icon,
    IconButton,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Divider,
    Link,
    Box,
    Button,
    Input,
    InputGroup,
    InputLeftElement,
} from '@chakra-ui/react';
import { FaUserNinja } from "react-icons/fa";
import ChatApp from '@/components/Chatbot';
import {
    FiHome,
    FiPieChart,
    FiDollarSign,
    FiBox,
    FiCalendar,
    FiChevronDown,
    FiChevronUp,
    FiPlus,
    FiCreditCard,
    FiSearch,
    FiBell,
} from 'react-icons/fi';
import MyChart from '../components/MyChart';
import { SiValorant } from "react-icons/si";

export default function dashboard() {
    const [display, changeDisplay] = useState('hide')
    const [value, changeValue] = useState(1)
    const [currentChart, setCurrentChart] = useState(0);
    const [mapsData, setMapsData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:5000/maps');
            setMapsData(response.data);
          } catch (error) {
            console.error('Error fetching competitive tiers data:', error);
          }
        };
      
        fetchData();
      }, []);

    return (
        <Flex
            h={[null, null, "100vh"]}
            maxW="2000px"
            flexDir={["column", "column", "row"]}
            overflow="hidden"
        >
            <Flex
                w={["100%", "100%", "10%", "15%", "15%"]}
                flexDir="column"
                alignItems="center"
                backgroundColor="#020202"
                color="#fff"
            >
                <Flex
                    flexDir="column"
                    h={[null, null, "100vh"]}
                    justifyContent="space-between"
                >
                    <Flex
                        flexDir="column"
                        as="nav"
                    >
                        <Heading
                            mt={50}
                            mb={[25, 50, 100]}
                            fontSize={["4xl", "4xl", "2xl", "3xl", "4xl",]}
                            alignSelf="center"
                            letterSpacing="tight"
                        >
                            <Icon as={SiValorant} color="pink.500" fontSize="6xl" />
                        </Heading>
                        <Flex 
                            flexDir={["row", "row", "column", "column", "column"]}
                            align={["center", "center", "center", "flex-start", "flex-start"]}
                            wrap={["wrap", "wrap", "nowrap", "nowrap", "nowrap"]}
                            justifyContent="center"
                        >
                            <Flex className="sidebar-items"  mr={[2, 6, 0, 0, 0]}>
                                <Link display={["none", "none", "flex", "flex", "flex"]}>
                                    <Icon as={FiPieChart} className="active-icon" fontSize="2xl"/>
                                </Link>
                                <Link _hover={{ textDecor: 'none' }} display={["flex", "flex", "none", "flex", "flex"]}>
                                    <Text className='active'>Home</Text>
                                </Link>
                            </Flex>
                            <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]}>
                                <Link display={["none", "none", "flex", "flex", "flex"]}>
                                    <Icon as={FaUserNinja} fontSize="2xl"/>
                                </Link>
                                <Link _hover={{ textDecor: 'none' }} display={["flex", "flex", "none", "flex", "flex"]}>
                                    <Text>Agents</Text>
                                </Link>
                            </Flex>
                            {/* Corrected: Close each Flex block properly */}
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
            {/*Column 2 */}
            <Flex
                w={["100%", "100%", "60%", "60%", "55%"]}
                p="3%"
                flexDir="column"
                overflow="auto"
                minH="100vh"
            >
                <Heading 
                    fontWeight="normal"
                    mb={4}
                    letterSpacing="tight"
                >
                    Welcome!</Heading>
                <Text color="gray" fontSize="md">Tiers</Text>
                <Text fontWeight="bold" color="#D53F8C" fontSize="2xl">10</Text>
                <MyChart />
                <Flex justifyContent="space-between" mt={8}>
                    <Flex align="flex-end">
                        <Heading as="h2" size="lg" letterSpacing="tight">Maps</Heading>
                        <Text fontSize="small" color="gray" ml={4}>June 2024</Text>
                    </Flex>
                    
                </Flex>
                <Flex flexDir="column">
                    <Flex overflow="auto">
                        <Table variant="unstyled" mt={4}>
                            <Thead>
                                <Tr color="gray">
                                    <Th>#</Th>
                                    <Th>{}</Th>
                                    <Th isNumeric>NAME</Th>
                                    <Th>COORDINATES</Th>
                                    <Th>SITES</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                            {mapsData.filter(map => map[1] != "The Range" && map[2] && map[4])
                            .slice(0,display === "show" ? mapsData.length : 6)
                            .map((map, index) => (
                                <Tr key={index}>
                                    <Td>
                                        {index + 1}
                                    </Td>
                                    <Td>
                                        <Flex mr="1" align="center">
                                            <Avatar size="lg" mr={3} src={map[3]} />
                                        </Flex>
                                    </Td>
                                    <Td>
                                        <Flex flexDir="column">
                                            <Heading size="sm" letterSpacing="tight">{map[1]}</Heading>
                                        </Flex>
                                    </Td>
                                    <Td>
                                        <Flex flexDir="column">
                                            <Heading size="sm" letterSpacing="tight">{map[4]}</Heading>
                                        </Flex>
                                    </Td>
                                    <Td>
                                        <Flex align="center">
                                            <Avatar size="md" mr={2} src={map[2]} />
                                        </Flex>
                                    </Td>
                                </Tr>
                            ))}  
                            </Tbody>
                        </Table>
                    </Flex>
                    <Flex align="center">
                        <Divider />
                        <IconButton
                            icon={display === 'show' ? <FiChevronUp /> : <FiChevronDown />}
                            onClick={() => changeDisplay(display === 'show' ? 'hide' : 'show')}
                        />
                        <Divider />
                    </Flex>
                </Flex>
            </Flex>

            {/* Column 3 */}
            <Flex
                w={["100%", "100%", "30%"]}
                bgColor="#F5F5F5" p="3%"
                flexDir="column"
                overflow="auto"
                minW={[null, null, "300px", "300px", "400px"]}
            >
                <Flex alignContent="center">
                    <InputGroup bgColor="#fff" mb={4} border="none" borderColor="#fff" borderRadius="10px" mr={2}>
                        <InputLeftElement
                            pointerEvents="none"
                            children={<FiSearch color="gray" />}
                        />
                        <Input type="number" placeholder="Search" borderRadius="10px" />
                    </InputGroup>
                    <IconButton icon={<FiBell />} fontSize="sm" bgColor="#fff" borderRadius="50%" p="10px" />
                    <Flex
                        w={30}
                        h={25}
                        bgColor="#B57295"
                        borderRadius="50%"
                        color="#fff"
                        align="center"
                        justify="center"
                        ml="-3"
                        mt="-2"
                        zIndex="100"
                        fontSize="xs"
                    >
                        2
                    </Flex>
                </Flex>
                <Heading letterSpacing="tight">Weapons</Heading>
                {value == 1 &&
                    <Box
                        borderRadius="25px"
                        mt={4}
                        w="100%"
                        h="200px"
                        bgGradient="linear(to-t, #B57295, #29259A)"
                    >
                        <Flex p="1em" color="#fff" flexDir="column" h="100%" justify="space-between">
                            <Flex justify="space-between" w="100%" align="flex-start">
                                <Flex flexDir="column">
                                    <Text color="gray.400">Bulldog</Text>
                                    <Text fontWeight="bold" fontSize="xl"></Text>
                                </Flex>
                                <Flex align="center">
                                    <Text>AR</Text>
                                </Flex>
                            </Flex>
                            <Text mb={4}></Text>
                            <Flex align="flex-end" justify="space-between">
                                <Flex>
                                    <Flex flexDir="column" mr={4}>
                                        <Text textTransform="uppercase" fontSize="xs">23/23</Text>
                                        <Text fontSize="lg">RIOT GAMES</Text>
                                    </Flex>
                                    <Flex flexDir="column">
                                        <Text textTransform="uppercase" fontSize="xs"></Text>
                                        <Text fontSize="lg"></Text>
                                    </Flex>
                                </Flex>
                            </Flex>
                        </Flex>
                    </Box>
                }
                {value == 2 &&
                    <Box
                        borderRadius="25px"
                        mt={4}
                        w="100%"
                        h="200px"
                        bgGradient="linear(to-t, yellow.300, blue.500)"
                    >
                        <Flex p="1em" color="#fff" flexDir="column" h="100%" justify="space-between">
                            <Flex justify="space-between" w="100%" align="flex-start">
                                <Flex flexDir="column">
                                    <Text color="gray.400"></Text>
                                    <Text fontWeight="bold" fontSize="xl">Vandal</Text>
                                </Flex>
                                <Flex align="center">
                                    <Text>AR</Text>
                                </Flex>
                            </Flex>
                            <Text mb={4}></Text>
                            <Flex align="flex-end" justify="space-between">
                                <Flex>
                                    <Flex flexDir="column" mr={4}>
                                        <Text textTransform="uppercase" fontSize="xs">32/32</Text>
                                        <Text fontSize="lg">RIOTGAMES</Text>
                                    </Flex>
                                    <Flex flexDir="column">
                                        <Text textTransform="uppercase" fontSize="xs"></Text>
                                        <Text fontSize="lg"></Text>
                                    </Flex>
                                </Flex>
                            </Flex>
                        </Flex>
                    </Box>
                }
                {value == 3 &&
                    <Box
                        borderRadius="25px"
                        mt={4}
                        w="100%"
                        h="200px"
                        bgGradient="linear(to-t, orange.300, pink.600)"
                    >
                        <Flex p="1em" color="#fff" flexDir="column" h="100%" justify="space-between">
                            <Flex justify="space-between" w="100%" align="flex-start">
                                <Flex flexDir="column">
                                    <Text color="gray.400">Phantom</Text>
                                    <Text fontWeight="bold" fontSize="xl"></Text>
                                </Flex>
                                <Flex align="center">
                                    <Text>SMG</Text>
                                </Flex>
                            </Flex>
                            <Text mb={4}></Text>
                            <Flex align="flex-end" justify="space-between">
                                <Flex>
                                    <Flex flexDir="column" mr={4}>
                                        <Text textTransform="uppercase" fontSize="xs">23/23</Text>
                                        <Text fontSize="lg">RIOT GAMES</Text>
                                    </Flex>
                                    <Flex flexDir="column">
                                        <Text textTransform="uppercase" fontSize="xs"></Text>
                                        <Text fontSize="lg"></Text>
                                    </Flex>
                                </Flex>
                            </Flex>
                        </Flex>
                    </Box>
                }

                <Flex justifyContent="center" mt={2}>
                    <Button bgColor={value == 1 ? "gray.600" : "gray.400"} size="xs" mx={1} onClick={() => changeValue(1)} />
                    <Button bgColor={value == 2 ? "gray.600" : "gray.400"} size="xs" mx={1} onClick={() => changeValue(2)} />
                    <Button bgColor={value == 3 ? "gray.600" : "gray.400"} size="xs" mx={1} onClick={() => changeValue(3)} />
                </Flex>
                <Flex flexDir="column" my={4}>
                    <Flex justify="space-between" mb={2}>
                        <Text>Ammo</Text>
                        <Text fontWeight="bold">?</Text>
                    </Flex>
                    <Flex justify="space-between">
                        <Text>Damage</Text>
                        <Text fontWeight="bold">?</Text>
                    </Flex>
                </Flex>
                <br />
                <Flex><ChatApp /></Flex>
            </Flex>
        </Flex>
    )
}