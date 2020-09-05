/* eslint-disable react/prop-types */
import {
  Container,
  Heading,
  Button,
  useThemeUI,
  Flex,
  Box,
  Spinner,
  useColorMode,
  IconButton,
  Link
} from 'theme-ui';
import { useState } from 'react';
import Head from 'next/head';
import { NextSeo } from 'next-seo';
import { Moon, Sun, GitHub, ExternalLink } from 'react-feather';

export async function getStaticProps() {
  const res = await fetch('https://quotes.dhrvs.workers.dev/');
  const json = await res.json();
  const quoteInitial = json.quote;

  return {
    props: {
      quoteInitial
    }
  };
}

export default function Home({ quoteInitial }) {
  const { theme } = useThemeUI();
  const [colorMode, setColorMode] = useColorMode();
  const [{ quote, loading }, setState] = useState({ quote: quoteInitial, loading: false });
  const fetchQuote = async (e) => {
    e.preventDefault();
    setState({ quote, loading: true });
    const res = await fetch('https://quotes.dhrvs.workers.dev/');

    if (res.ok) {
      const json = await res.json();
      const quote = json.quote;
      // console.log('Hey ' + quote);
      return setState({ quote: quote, loading: false, success: true });
    }
    setState({ quote, loading: false });
  };
  return (
    <>
      <NextSeo title="Dhruv Suthar" description="Student Developer Designer Minimalist" />
      <Head>
        <title>Quotes | Dhruv Suthar</title>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"></link>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"></link>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"></link>
        <link rel="manifest" href="/site.webmanifest"></link>
        <meta name="theme-color" content={theme.colors?.primary} />
      </Head>
      <Container
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          py: [2, 3, 5],
          px: [1, 2, 4],
          maxWidth: 768
        }}>
        <Flex
          sx={{
            width: '100%',
            borderWidth: 0,
            borderBottomWidth: 1,
            borderStyle: 'solid',
            borderColor: 'muted'
          }}>
          <Box p={3} sx={{ flex: '1 1 auto' }}>
            <Heading sx={{ fontSize: 3 }}>Quotes</Heading>
          </Box>
          <Box p={3}>
            <IconButton
              aria-label="Toggle Light/Dark"
              sx={{
                cursor: 'pointer'
              }}
              onClick={(e) => {
                setColorMode(colorMode === 'default' ? 'dark' : 'default');
              }}>
              {colorMode === 'default' ? (
                <Moon color={theme.colors?.primary} />
              ) : (
                <Sun color={theme.colors?.primary} />
              )}
            </IconButton>
          </Box>
        </Flex>
        <Container
          sx={{
            py: [2, 3, 5],
            px: [1, 2, 4],
            maxWidth: 768,
            flex: '1 1 auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center'
          }}>
          <Heading
            sx={{
              pt: 4
            }}>
            <Container>{quote}</Container>
          </Heading>
          <Button
            onClick={fetchQuote}
            sx={{
              background: 'primary',
              color: 'background',
              cursor: 'pointer',
              p: 3,
              fontFamily: 'Inter',
              width: 240
            }}>
            {loading ? (
              <>
                <Spinner
                  sx={{
                    size: 12,
                    color: 'background'
                  }}
                />
              </>
            ) : (
              <>Fetch Random Quote</>
            )}
          </Button>
        </Container>
        <Flex
          sx={{
            width: '100%',
            borderWidth: 0,
            borderTopWidth: 1,
            borderStyle: 'solid',
            borderColor: 'muted'
          }}>
          <Box p={3} sx={{ flex: '1 1 auto' }}>
            <IconButton aria-label="Home">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18" height="18">
                <rect
                  height={18}
                  width={18}
                  cx={18}
                  cy={18}
                  fill="none"
                  stroke={theme.colors?.primary}
                  strokeWidth={4}
                />
                <circle r={9} cx={18} cy={9} fill="none" stroke="#818181" strokeWidth={2} />
              </svg>
            </IconButton>
          </Box>
          <Box p={3}>
            <Heading sx={{ fontSize: 1, px: 2 }}>
              <IconButton
                aria-label="Source Code"
                p={2}
                href="https://github.com/0xdhrv/quotes-app"
                target="_blank"
                rel="noreferrer">
                <GitHub />
              </IconButton>
              <IconButton
                aria-label="Author Website"
                p={2}
                href="https://dhrv.pw/"
                target="_blank"
                rel="noreferrer">
                <ExternalLink />
              </IconButton>
            </Heading>
          </Box>
        </Flex>
      </Container>
    </>
  );
}
