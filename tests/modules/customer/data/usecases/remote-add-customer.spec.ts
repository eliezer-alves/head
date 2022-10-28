import { HttpClientSpy } from '@/../tests/common/http'
import { AccessDeniedError, UnexpectedError } from '@/common/errors'
import { HttpStatus } from '@/common/http'
import { RemoteAddCustomer } from '@customer/data/usecases'
import { faker } from '@faker-js/faker'
import { describe, expect, it } from 'vitest'
import { mockAddCustomerParams } from '../../domain/mocks/mock-add-customer'

type SutTypes = {
  sut: RemoteAddCustomer
  httpClientSpy: HttpClientSpy<RemoteAddCustomer.Model>
}

const makeSut = (url = 'stripe_customers'): SutTypes => {
  const httpClientSpy = new HttpClientSpy<RemoteAddCustomer.Model>()
  const sut = new RemoteAddCustomer(url, httpClientSpy)

  return { sut, httpClientSpy }
}

describe('RemoteAddCustomer', () => {
  it('Should instantiate RemoteAddCustomer use case correctly', () => {
    const { sut } = makeSut()
    expect(sut).not.toBeNull()
    expect(sut.exec).not.toBeNull()
  })

  it('Should call HttpClient with correct values', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)
    const addCusmoerParams = mockAddCustomerParams()

    await sut.exec(addCusmoerParams)
    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.body).toEqual(addCusmoerParams)
  })

  it('Should throw UnexpectedError if HttpClient returns 400', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response.status = HttpStatus.badRequest

    const promise = sut.exec(mockAddCustomerParams())

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('Should throw UnexpectedError if HttpClient returns 403', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response.status = HttpStatus.forbidden

    const promise = sut.exec(mockAddCustomerParams())

    await expect(promise).rejects.toThrow(new AccessDeniedError())
  })

  it('Should throw UnexpectedError if HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response.status = HttpStatus.serverError

    const promise = sut.exec(mockAddCustomerParams())

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
