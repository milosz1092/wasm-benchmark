mod fibonacci;
pub use fibonacci::fibonacci_recu;

mod prime;
pub use prime::prime_numbers_in_range;

mod xxhash;
pub use xxhash::{xxhash_once, xxhash_own_iter};
