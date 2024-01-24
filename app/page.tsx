'use client';

import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Box, Dialog, Separator, Text, TextField } from '@radix-ui/themes';
import { debounce } from 'lodash';
import { CldImage } from 'next-cloudinary';
import { Fragment, useState } from 'react';

import HighlightedText from '@/components/HighlightedText';
import useRealmLogin from '@/hooks/useRealmLogin';
import styles from './page.module.scss';

interface Episode {
  _id: any;
  title: string;
  poster: string;
  director: string;
  releaseDate: string;
}

export default function Home() {
  const { user } = useRealmLogin();

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Episode[]>([]);

  const handleSearch = debounce(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchResults([]);
      setSearchTerm(event.target.value);

      if (event.target.value.trim() === '') return;

      try {
        const results = await user?.functions.searchEpisodes(
          event.target.value
        );
        setSearchResults(results);
      } catch (error) {}
    },
    300
  );

  return (
    <main className={styles.main}>
      <Dialog.Root
        onOpenChange={(open) => {
          if (!open) {
            setSearchResults([]);
            setSearchTerm('');
          }
        }}
      >
        <Dialog.Trigger className={styles.searchbar}>
          <TextField.Root>
            <TextField.Slot>
              <MagnifyingGlassIcon height="16" width="16" />
            </TextField.Slot>
            <TextField.Input
              className={styles.searchbarinput}
              placeholder="Search Star Wars Episode..."
              size="2"
            />
          </TextField.Root>
        </Dialog.Trigger>

        <Dialog.Content className={styles.searchdialog}>
          <TextField.Root>
            <TextField.Slot>
              <MagnifyingGlassIcon height="16" width="16" />
            </TextField.Slot>
            <TextField.Input
              onChange={handleSearch}
              placeholder="Search Star Wars Episode..."
              size="3"
            />
          </TextField.Root>

          {searchResults.length > 0 && (
            <Fragment>
              <Separator my="3" size="4" />

              <Box className={styles.searchresults}>
                {searchResults.map((episode) => (
                  <Fragment key={episode._id}>
                    <Box className={styles.episode}>
                      <Box className={styles.poster}>
                        <CldImage
                          width="92"
                          height="138"
                          src={episode.poster}
                          alt={episode.title}
                        />
                      </Box>

                      <Box className={styles.details}>
                        <Text as="div" size="3" weight="bold">
                          <HighlightedText
                            text={episode.title}
                            highlight={searchTerm}
                          />
                        </Text>
                        <Text as="div" size="2">
                          Director:{' '}
                          <HighlightedText
                            text={episode.director}
                            highlight={searchTerm}
                          />
                        </Text>
                        <Text as="div" size="1" weight="light">
                          Release Date: {episode.releaseDate}
                        </Text>
                      </Box>
                    </Box>
                    <Separator mb="3" size="4" />
                  </Fragment>
                ))}
              </Box>
            </Fragment>
          )}
        </Dialog.Content>
      </Dialog.Root>
    </main>
  );
}
