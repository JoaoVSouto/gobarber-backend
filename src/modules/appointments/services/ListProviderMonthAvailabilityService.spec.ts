import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';

import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the month availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: '123',
      user_id: '321',
      date: new Date(2020, 10, 5, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '123',
      user_id: '321',
      date: new Date(2020, 11, 5, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '123',
      user_id: '321',
      date: new Date(2020, 11, 5, 9, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '123',
      user_id: '321',
      date: new Date(2020, 11, 5, 10, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '123',
      user_id: '321',
      date: new Date(2020, 11, 5, 11, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '123',
      user_id: '321',
      date: new Date(2020, 11, 5, 12, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '123',
      user_id: '321',
      date: new Date(2020, 11, 5, 13, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '123',
      user_id: '321',
      date: new Date(2020, 11, 5, 14, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '123',
      user_id: '321',
      date: new Date(2020, 11, 5, 15, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '123',
      user_id: '321',
      date: new Date(2020, 11, 5, 16, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '123',
      user_id: '321',
      date: new Date(2020, 11, 5, 17, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '123',
      user_id: '321',
      date: new Date(2020, 11, 4, 17, 0, 0),
    });

    const availability = await listProviderMonthAvailability.execute({
      provider_id: '123',
      year: 2020,
      month: 12,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        {
          day: 1,
          available: true,
        },
        {
          day: 2,
          available: true,
        },
        {
          day: 3,
          available: true,
        },
        {
          day: 4,
          available: true,
        },
        {
          day: 5,
          available: false,
        },
      ]),
    );
  });
});
