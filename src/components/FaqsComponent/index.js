import Marquee from "react-easy-marquee";
import { Box } from "@mui/system";
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import { Typography } from "@mui/material";
import { useState } from "react";
import ReactHtmlParser from 'react-html-parser';
import './index.scss';
import { useDappContext } from "../../utils/context";

const FaqsComponent = () => {
    const { theme, } = useDappContext();
    const [displayStates, setDisplayStates] = useState({
        [0]: true,
        [1]: true,
        [2]: true,
        [3]: true,
        [4]: true,
    });

    const faqs = [
        {
            question: 'FAQ 1 - What is Clio and how does it help with domain searches?',
            answer: 'A: Clio is an AI-powered domain assistant developed by Domain Labs in collaboration with OpenAI. It helps users find the perfect domain name by providing accurate and personalized recommendations based on their preferences, saving them time and effort during the domain search process.',
        },
        {
            question: 'FAQ 2 - How does Clio\'s AI technology work?',
            answer: 'A: Clio utilizes advanced AI algorithms developed by OpenAI to analyze user preferences and search patterns, providing tailored domain name suggestions that align with their requirements and goals. The Domain Labs team has also customized some of the models to ensure compatibility with the ENS (Ethereum Name Service) and BNB (SPACE ID) networks, offering users a comprehensive domain searching experience across different platforms.',
        },
        {
            question: 'FAQ 3 - Is Clio easy to use for beginners?',
            answer: 'A: Absolutely! Clio is designed to be user-friendly and accessible to users of all levels, from beginners to experts. Its intuitive interface allows for seamless domain searching and personalized recommendations.',
        },
        {
            question: 'FAQ 4 - How much does Clio cost?',
            answer: '<p>A: Pricing details for Clio can be found on <a href=\'https://domainlabs.app\'>Domain Labs\' website.</a> We offer various plans to suit the needs of different users, including affordable options for individuals and businesses.</p>',
        },
        {
            question: 'FAQ 5 - Can I trust the domain suggestions provided by Clio?',
            answer: 'A: Yes, Clio\'s recommendations are powered by OpenAI, ensuring that you receive the most accurate and relevant domain suggestions based on your input and preferences. Additionally, the Domain Labs team has customized some models to align with their vision for the ENS (Ethereum Name Service) and BNB (SPACE ID) ecosystem, further enhancing the reliability and quality of Clio\'s domain suggestions.',
        },
    ];

    return (
        <Box>
            <Typography
                color="white"
                display={'flex'}
                justifyContent={'center'}
                textAlign={'center'}
                sx={{
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: '700',
                    fontSize: '40px',
                    lineHeight: '48px',
                    letterSpacing: '-0.01em',
                    color: theme == 'dark-theme' ? 'white' : 'black',
                }}
            >
                Domain Labs FAQ
            </Typography>

            <Typography
                color="white"
                display={'flex'}
                justifyContent={'center'}
                textAlign={'center'}
                mt={'16px'}
                sx={{
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: '400',
                    fontSize: '18px',
                    lineHeight: '22px',
                    letterSpacing: '-0.01em',
                    color: theme == 'dark-theme' ? 'white' : 'black',
                }}
            >
                Answers to Your Most Common Questions
            </Typography>

            <Box
                display={'flex'}
                justifyContent={'center'}
            >
                <Box
                    sx={{
                        background: 'linear-gradient(84.72deg, #4BD8D8 -26.27%, #146EB4 106.95%)',
                        borderRadius: '20px',
                    }}
                    mt={'40px'}
                    maxWidth={'800px'}
                >
                    <Typography
                        fontSize={{ md: "2.999vw", xs: "2.5707vw" }}
                        p='40px'
                        style={{
                            fontFamily: 'Inter',
                            fontWeight: '700',
                            fontSize: '18px',
                            lineHeight: '22px',
                            alignItems: 'center',
                            color: 'white',
                        }}
                        fontWeight={400}
                        align="left"
                        marginRight={'10px'}
                    >
                        Introducing Clio, your AI domain assistant powered by OpenAI, one of the top AI companies in the world. At Domain Labs, we believe in providing the best possible experience for our customers, and that's why we use OpenAI to power Clio. With Clio, you can save time and money on domain searches, with accurate and personalized recommendations based on your preferences. And with OpenAI powering Clio, you can trust that you're getting the most advanced AI technology available. Thank you for choosing Domain Labs and Clio for your domain search needs.
                    </Typography>
                </Box>
            </Box>

            <Box
                mt={'117px'}
                mx={['36px', '36px', '40px']}
            >
                {faqs.map((item, index) => (
                    <Box
                        key={index}
                    >
                        <Box
                            display={'flex'}
                            gap={'10px'}
                            position={'relative'}
                        >
                            <Typography
                                color="white"
                                mt={'16px'}
                                mb={displayStates[index] ? '0px' : '16px'}
                                mr={'10px'}
                                sx={{
                                    fontFamily: 'Inter',
                                    fontStyle: 'normal',
                                    fontWeight: '700',
                                    fontSize: '32px',
                                    lineHeight: '39px',
                                    letterSpacing: '-0.01em',
                                    color: theme == 'dark-theme' ? 'white' : 'black',
                                }}
                            >
                                {!displayStates[index] ? `FAQ ${index + 1}` : item.question}
                            </Typography>

                            <Box
                                position={'absolute'}
                                right={'-10px'}
                                alignItems={'center'}
                                height={'100%'}
                                display={'flex'}
                                color={theme == 'dark-theme' ? 'white' : 'black'}
                                className="dropdown-dropup-svg-wrapper"
                                onClick={() => setDisplayStates({
                                    ...displayStates,
                                    [index]: !displayStates[index],
                                })}
                                sx={{
                                    cursor: 'pointer',
                                }}
                            >
                                {
                                    displayStates[index] ? <IoMdArrowDropdown /> : <IoMdArrowDropup />
                                }

                            </Box>
                        </Box>

                        <Typography
                            className="faq-answers"
                            display={displayStates[index] ? 'flex' : 'none'}
                            color="white"
                            mt={'28px'}
                            mb={'54px'}
                            ml={{ xs: '22px', sm: '44px', md: '66px', lg: '88px' }}
                            sx={{
                                fontFamily: 'Inter',
                                fontStyle: 'normal',
                                fontWeight: '500',
                                fontSize: '16px',
                                lineHeight: '19px',
                                letterSpacing: '-0.01em',
                                color: theme == 'dark-theme' ? 'white' : 'black',
                            }}
                        >
                            {ReactHtmlParser(item.answer)}
                        </Typography>

                        <Box
                            display={index == faqs.length - 1 ? 'none' : 'block'}
                        >
                            <hr />
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box >
    );
};

export default FaqsComponent;