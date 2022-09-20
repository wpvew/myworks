import React from 'react';
import styles from './actions.css';
import { SaveButton } from './SaveButton';
import { ShareButton } from './ShareButton';

export function Actions() {
  return (
    <div className={styles.actions}>
      <ShareButton />
      <SaveButton />
    </div>
  );
}
