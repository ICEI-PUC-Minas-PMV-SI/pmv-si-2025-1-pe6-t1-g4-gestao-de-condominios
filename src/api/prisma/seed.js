import { PrismaClient, UserProfile, CommonAreaType, FeeType } from '@prisma/client';

const prisma = new PrismaClient();

const passwordHash = '$2b$10$MS8IavIvPIjdjW.WfKPrQOOFlqLHxUxZTlPVsluxKpLKutgqwUI0K'; // abc123

async function main() {
  const condominiumName = 'Residencial Flor do Campo';
  const condominiumAddress = 'Rua das Acácias, 123';

  const existingCondo = await prisma.condominium.findFirst({
    where: { name: condominiumName },
  });

  if (existingCondo) {
    const condoId = existingCondo.id;
    
    await prisma.payment.deleteMany({
      where: { condominiumId: condoId },
    });
    
    await prisma.fee.deleteMany({
      where: { condominiumId: condoId },
    });

    await prisma.commonArea.deleteMany({
      where: { condominiumId: condoId },
    });

    await prisma.apartment.deleteMany({
      where: { condominiumId: condoId },
    });

    await prisma.user.deleteMany({
      where: { condominiumId: condoId },
    });

    await prisma.condominium.delete({
      where: { id: condoId },
    });

    console.log('Condomínio anterior e dados associados foram removidos.');
  }


  const condominium = await prisma.condominium.create({
    data: {
      name: condominiumName,
      address: condominiumAddress,
    },
  });

  await prisma.commonArea.create({
    data: {
      type: CommonAreaType.BARBECUE,
      quantity: 2,
      condominiumId: condominium.id,
    },
  });

  const apartment = await prisma.apartment.create({
    data: {
      block: 'A',
      number: 101,
      floor: 1,
      condominiumId: condominium.id,
    },
  });

  const users = [
    {
      name: 'Admin User',
      email: 'admin@example.com',
      profile: UserProfile.ADMIN,
    },
    {
      name: 'Manager User',
      email: 'manager@manager.com',
      profile: UserProfile.MANAGER,
    },
    {
      id: 'cm95et3qo0000lymo8qjugf0u',
      name: 'Resident User',
      email: 'resident@resident.com',
      profile: UserProfile.RESIDENT,
    },
    {
      id: 'cm8gwtwur0006lyo4rwlsyj0w',
      name: 'User to Delete',
      email: 'user_to_delete@teste.com',
      profile: UserProfile.RESIDENT,
    },
    {
      id: 'cm8i76f940000lyc4yj92ou1w',
      name: 'User forgot password',
      email: 'user_forgot_password@teste.com',
      profile: UserProfile.RESIDENT,
    },
    {
      id: 'cm8i7azvl0001lyc4h3mu4360',
      name: 'User change password',
      email: 'user_change_password@teste.com',
      profile: UserProfile.RESIDENT,
    },
    {
      id: 'cm8ghp8510001ly7swfuiop1g',
      name: 'Fixed manager user',
      email: 'fixed_manager_user@teste.com',
      profile: UserProfile.RESIDENT,
    },
  ];

  for (const userData of users) {
    const existingUser = await prisma.user.findUnique({
      where: { email: userData.email },
    });

    if (existingUser) {
      await prisma.user.delete({
        where: { email: userData.email },
      });
      console.log(`Usuário existente removido: ${userData.email}`);
    }

    const userToSave = {
      name: userData.name,
      email: userData.email,
      password: passwordHash,
      profile: userData.profile,
      isActive: true,
      condominiumId: condominium.id,
    }

    if (userData.id) {
      userToSave.id = userData.id;
    }

    const user = await prisma.user.create({
      data: userToSave,
    });

    console.log(`Usuário criado: ${userData.email}`);
  }


  const fee = [
    {
      name: 'Rent Fee',
      due: '2025-05-01T00:00:00.000Z',
      isRecurrent: true,
      type: FeeType.RENT,
    },
    {
      name: 'Condo Fee',
      due: '2025-05-01T00:00:00.000Z',
      isRecurrent: true,
      type: FeeType.CONDOMINIUM,
    },
    {
      name: 'Other Fee',
      due: '2025-05-01T00:00:00.000Z',
      isRecurrent: false,
      type: FeeType.OTHER,
    },
    {
      name: 'Fee to Delete',
      due: '2025-05-01T00:00:00.000Z',
      isRecurrent: false,
      type: FeeType.OTHER,
    },
    {
      name: 'Fee to Update',
      due: '2025-05-01T00:00:00.000Z',
      isRecurrent: false,
      type: FeeType.OTHER,
    },
  ];

  for (const feeData of fee) {

    const fee = await prisma.fee.create({
      data: {
        name: feeData.name,
        due: feeData.due,
        isRecurrent: feeData.isRecurrent,
        type: feeData.type,
        condominiumId: condominium.id,
      },
    });

    console.log(`Taxa criada: ${feeData.name}`);
  }
  

  const residentUser = await prisma.user.findUnique({
    where: { email: 'resident@resident.com' },
  });

  const rentFeeId = await prisma.fee.findFirst({
    where: { name: 'Rent Fee', due: '2025-05-01T00:00:00.000Z', isRecurrent: true, condominiumId: condominium.id },  
  });

  const condominiumFeeId = await prisma.fee.findFirst({
    where: { name: 'Condo Fee', due: '2025-05-01T00:00:00.000Z', isRecurrent: true, condominiumId: condominium.id },  
  });

  const otherFeeId = await prisma.fee.findFirst({
    where: { name: 'Other Fee', due: '2025-05-01T00:00:00.000Z', isRecurrent: false, condominiumId: condominium.id },  
  });

  const payment = [
    {
      amount: '500.00',
      paymentDate: '2025-05-01T00:00:00.000Z',
      feeId: rentFeeId.id,
    },
    {
      amount: '100.00',
      paymentDate: '2025-05-01T00:00:00.000Z',
      feeId: condominiumFeeId.id,
    },
    {
      amount: '25.00',
      paymentDate: '2025-05-01T00:00:00.000Z',
      feeId: otherFeeId.id,
    },
    {
      amount: '100.00',
      paymentDate: '2025-06-01T00:00:00.000Z',
      feeId: condominiumFeeId.id,
    },
    {
      amount: '500.00',
      paymentDate: '2025-06-01T00:00:00.000Z',
      feeId: rentFeeId.id,
    },
  ];

  for (const paymentData of payment) {

    const payment = await prisma.payment.create({
      data: {
        amount: paymentData.amount,
        paymentDate: paymentData.paymentDate,
        feeId: paymentData.feeId,
        userId: residentUser?.id,
        apartmentId: apartment.id,
        condominiumId: condominium.id,
      },
    });

    console.log(`Pagamento criado: ${paymentData.amount, paymentData.paymentDate}`);
  }

  console.log('✅ Seed finalizado com sucesso!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
