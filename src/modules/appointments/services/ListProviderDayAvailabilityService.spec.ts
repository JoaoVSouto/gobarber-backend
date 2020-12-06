import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';

import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvailability: ListProviderDayAvailabilityService;

describe('ListProviderDayAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderDayAvailability = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the day availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: '123',
      date: new Date(2020, 11, 5, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '123',
      date: new Date(2020, 11, 5, 10, 0, 0),
    });

    const availability = await listProviderDayAvailability.execute({
      provider_id: '123',
      year: 2020,
      month: 12,
      day: 5,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 10, available: false },
        { hour: 11, available: true },
        { hour: 17, available: true },
      ]),
    );
  });
});
