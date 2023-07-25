import './index.scss';

import { Box } from '@mui/system';
import Faq from '../Faq';
import { Typography } from '@mui/material';
import { useState } from 'react';
import { useTheme } from '../../contexts/theme';

const FaqsComponent = () => {
  const { theme } = useTheme();
  const [faqState, setFaqState] = useState({
    0: true,
    1: true,
    2: true,
    3: true,
    4: true,
  });

  const faqs = [
    {
      question:
        'FAQ 1 - What is Clio and how does it help with domain searches?',
      answer:
        "A: Clio is an AI-powered domain assistant developed by Domain Labs in collaboration with OpenAI. It helps users find the perfect domain name by providing accurate and personalized recommendations based on their preferences, saving them time and effort during the domain search process. Introducing Clio, your AI domain assistant powered by OpenAI, one of the top AI companies in the world. At Domain Labs, we believe in providing the best possible experience for our customers, and that's why we use OpenAI to power Clio. With Clio, you can save time and money on domain searches, with accurate and personalized recommendations based on your preferences. And with OpenAI powering Clio, you can trust that you're getting the most advanced AI technology available. Thank you for choosing Domain Labs and Clio for your domain search needs.",
    },
    {
      question: "FAQ 2 - How does Clio's AI technology work?",
      answer:
        'A: Clio utilizes advanced AI algorithms developed by OpenAI to analyze user preferences and search patterns, providing tailored domain name suggestions that align with their requirements and goals. The Domain Labs team has also customized some of the models to ensure compatibility with the ENS (Ethereum Name Service) and BNB (SPACE ID) networks, offering users a comprehensive domain searching experience across different platforms.',
    },
    {
      question: 'FAQ 3 - Is Clio easy to use for beginners?',
      answer:
        'A: Absolutely! Clio is designed to be user-friendly and accessible to users of all levels, from beginners to experts. Its intuitive interface allows for seamless domain searching and personalized recommendations.',
    },
    {
      question: 'FAQ 4 - How much does Clio cost?',
      answer:
        "<p>A: Pricing details for Clio can be found on <a href='https://domainlabs.app'>Domain Labs' website.</a> We offer various plans to suit the needs of different users, including affordable options for individuals and businesses.</p>",
    },
    {
      question: 'FAQ 5 - Can I trust the domain suggestions provided by Clio?',
      answer:
        "A: Yes, Clio's recommendations are powered by OpenAI, ensuring that you receive the most accurate and relevant domain suggestions based on your input and preferences. Additionally, the Domain Labs team has customized some models to align with their vision for the ENS (Ethereum Name Service) and BNB (SPACE ID) ecosystem, further enhancing the reliability and quality of Clio's domain suggestions.",
    },
  ];

  return (
    <Box p={['15px', '20px', '30px']}>
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
          color: theme === 'dark-theme' ? 'white' : 'black',
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
          color: theme === 'dark-theme' ? 'white' : 'black',
        }}
      >
        Answers to Your Most Common Questions
      </Typography>

      <Box mt={'70px'} mx={['36px', '36px', '40px']}>
        {faqs.map((item, index) => (
          <Faq
            item={item}
            key={index}
            index={index}
            theme={theme}
            show={faqState[index]}
            handleShowState={(j) => {
              setFaqState({
                ...faqState,
                [j]: !faqState[j],
              });
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default FaqsComponent;
