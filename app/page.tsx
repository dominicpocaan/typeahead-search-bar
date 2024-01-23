'use client';

import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Container, Dialog, TextField } from '@radix-ui/themes';

import styles from './page.module.scss';

export default function Home() {
  return (
    <main>
      <Container size="1" className={styles.main}>
        <Dialog.Root>
          <Dialog.Trigger>
            <TextField.Root>
              <TextField.Slot>
                <MagnifyingGlassIcon height="16" width="16" />
              </TextField.Slot>
              <TextField.Input
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
                onChange={(event) => {
                  console.log(event.target.value);
                }}
                placeholder="Search Star Wars Episode..."
                size="3"
              />
            </TextField.Root>
          </Dialog.Content>
        </Dialog.Root>
      </Container>
    </main>
  );
}
