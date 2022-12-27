import { Bet } from '../models';

const testBet = {
    description: 'Who will win the Super Bowl?',
    optionA: 'New England Patriots',
    optionB: 'Seattle Seahawks',
};

describe('create', () => {
    it('creates a new bet', async () => {
        const bet = await Bet.create(testBet);
        expect(bet.description).toEqual(testBet.description);
        expect(bet.optionA).toEqual(testBet.optionA);
        expect(bet.optionB).toEqual(testBet.optionB);
        expect(bet.status).toEqual('In Progress');
        expect(bet.winner).toBeNull();
        await Bet.delete(bet.id);
    });
});

describe('findById', () => {
    it('finds a bet by its id', async () => {
        const bet = await Bet.create(testBet);
        const foundBet = await Bet.findById(bet.id);
        expect(foundBet.description).toEqual(bet.description);
        expect(foundBet.optionA).toEqual(bet.optionA);
        expect(foundBet.optionB).toEqual(bet.optionB);
        expect(foundBet.status).toEqual(bet.status);
        expect(foundBet.winner).toBeUndefined();
        await Bet.delete(bet.id);
    });
});

describe('update', () => {
    it('updates a bet', async () => {
        const bet = await Bet.create(testBet);
        const updates = { status: 'Closed', winner: 'New England Patriots' };
        await Bet.update(bet.id, updates);
        const updatedBet = await Bet.findById(bet.id);
        expect(updatedBet.status).toEqual('Closed');
        expect(updatedBet.winner).toEqual('New England Patriots');
        await Bet.delete(bet.id);
    });
});
