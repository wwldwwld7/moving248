import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const memberNameAtom = atom({
    key: 'atom_name',
    default: '',
    effects_UNSTABLE: [persistAtom],
});

export const memberEmailAtom = atom({
    key: 'atom_email',
    default: '',
    effects_UNSTABLE: [persistAtom],
});

export const memberTypeAtom = atom({
    key: 'atom_type',
    default: '',
    effects_UNSTABLE: [persistAtom],
});

export const memberIdAtom = atom({
    key: 'atom_id',
    default: '',
    effects_UNSTABLE: [persistAtom],
});

export const memberActiveApplyAtom = atom({
    key: 'atom_apply',
    default: '',
    effects_UNSTABLE: [persistAtom],
});
