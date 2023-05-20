/**
 * Abstract class for all models
 * @param E Entity
 * @param D DTO
 */
export abstract class BaseInfo<E> {
    private underlyingEntity: E;

    constructor(entity: E) {
        this.underlyingEntity = entity;
    }

    abstract toEntity(): E;
}
