import React, { KeyboardEvent, useState } from 'react';
import { MdAdd } from 'react-icons/md';

interface PropTypes {
  createWorkspace: (workspaceName: string) => void;
}

function AddWorkspaceCard({ createWorkspace }: PropTypes) {
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [name, setName] = useState<string>('');

  const createWorkspaceCard = () => {
    createWorkspace(name);

    setIsCreating(false);
    setName('');
  };

  const cancelCreateWorkspaceCard = () => {
    setIsCreating(false);
    setName('');
  };

  const handleBlur = () => {
    cancelCreateWorkspaceCard();
  };

  const handleKeyboard = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') createWorkspaceCard();
    if (event.key === 'Escape') cancelCreateWorkspaceCard();
  };

  return (
    <div>
      {isCreating ? (
        <input
          type="text"
          value={name}
          onChange={({ target }) => setName(target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyboard}
        />
      ) : (
        <button type="button" onClick={() => setIsCreating(true)}>
          <MdAdd />
        </button>
      )}
    </div>
  );
}

export default AddWorkspaceCard;
